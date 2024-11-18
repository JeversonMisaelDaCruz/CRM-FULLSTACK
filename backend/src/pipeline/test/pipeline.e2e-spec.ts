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

// Testes de criação
it('Criando um pipeline sem autenticação', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .send(createPipeline)
    .expect(401);
});

it('Criando um pipeline sem dados', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(pipelineMissingData)
    .expect(400);
});

it('Criando um pipeline com dados incorretos', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipelineWrongData)
    .expect(400);
});

it('Criando um pipeline com o campo maior que o limite', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipelineWithMaxLength)
    .expect(400);
});

it('Criando um pipeline', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .send(createPipeline)
    .expect(201);
});

// Testes de listagem
it('Listando todos os pipelines sem autenticação', async () => {
  return await request(app.getHttpServer()).get('/pipeline').expect(401);
});

it('Listando todos os pipelines na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/pipelines')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Listando todos os pipelines', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('Listando um pipeline pelo ID', async () => {
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
    .get(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

// Testes de atualização
it('Atualizando um pipeline sem autenticação', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .send(updatePipeline)
    .expect(401);
});

it('Atualizando um pipeline sem dados', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipelineWithoutData)
    .expect(400);
});

it('Atualizando um pipeline excedendo os limites', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipelineWithMaxLength)
    .expect(400);
});

it('Atualizando um pipeline na rota incorreta', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipelines/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipeline)
    .expect(404);
});

it('Atualizando um pipeline', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipeline)
    .expect(200);
});

// Testes de exclusão
it('Deletando um pipeline sem autenticação', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline/${pipelineId}`)
    .expect(401);
});

it('Deletando um pipeline sem passar ID', async () => {
  return await request(app.getHttpServer())
    .delete(`/pipeline/`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Deletando um pipeline na rota incorreta', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipelines/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Deletando um pipeline', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelines = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelineId = pipelines[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline/${pipelineId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});
