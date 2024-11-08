import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import {
  pipelineMissingData,
  createPipeline,
  createPipelineWrongData,
  createPipelineWithMaxLength,
  updatePipeline,
  updatePipelineWithoutData,
  updatePipelineWithMaxLength,
} from './consts-pipeline-e2e';

it('registrando um pipeline sem token', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .send(createPipeline)
    .expect(401);
});
it('registrando um pipeline com token mas sem data', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(pipelineMissingData)
    .expect(400);
});
it('registrando um pipeline com dados incorretos', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipelineWrongData)
    .expect(400);
});

it('registrando um pipeline com o campo maior que o limite', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipelineWithMaxLength)
    .expect(400);
});
it('registrando um pipeline', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipeline)
    .expect(201);
});
it('buscando todos os pipelines sem token', async () => {
  return await request(app.getHttpServer()).get('/pipeline').expect(401);
});

it('buscando todos os pipelines na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/pipelines')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('buscando todos os pipelines ', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('atualizando um pipeline sem token', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .send(updatePipeline)
    .expect(401);
});
it('atualizando um pipeline sem data', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipelineWithoutData)
    .expect(400);
});
it('atualizando um pipeline excedendo os limites', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipelineWithMaxLength)
    .expect(400);
});
it('atualizando um pipeline com a rota incorreta', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipelines/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipeline)
    .expect(404);
});
it('atualizando um pipeline', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipeline)
    .expect(200);
});
it('Deletando um pipeline sem token', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline/${pipelineId}`)
    .expect(401);
});
it('Deletando um pipeline sem passar id', async () => {
  return await request(app.getHttpServer())
    .delete(`/pipeline/`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});
it('Deletando um pipeline na rota incorreta ', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipelines/${pipelineId}`)
    .expect(404);
});
it('Deletando um pipeline ', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelines).toBeInstanceOf(Array);
  expect(pipelines.length).toBeGreaterThan(0);

  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});
