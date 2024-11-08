import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import {
  newPipelinePhase,
  pipelinePhaseWrongData,
} from './pipelinePhase.const.e2e';

it('Criando uma Pipeline Phase faltando autenticação', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline-phase')
    .send(newPipelinePhase)
    .expect(401);
});
it('Criando uma Pipeline Phase na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline-phases')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPipelinePhase)
    .expect(404);
});
it('Criando uma Pipeline Phase com os dados incorretos', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .send(pipelinePhaseWrongData)
    .expect(400);
});
it('Criando uma Pipeline Phase', async () => {
  return await request(app.getHttpServer())
    .post('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newPipelinePhase)
    .expect(201);
});

it('listando todas as pipelines', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});
it('listando todas as pipelines na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline-phases')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});
it('listando todas as pipelines sem autenticação', async () => {
  return await request(app.getHttpServer()).get('/pipeline-phase').expect(401);
});

it('listando uma pipeline pelo id', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhase = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelinePhase).toBeInstanceOf(Array);
  expect(pipelinePhase.length).toBeGreaterThan(0);

  const pipelinePhaseId = pipelinePhase[0].id;

  return await request(app.getHttpServer())
    .get(`/pipeline-phase/${pipelinePhaseId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});
