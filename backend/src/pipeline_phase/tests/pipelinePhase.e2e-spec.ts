// pipelinePhase.e2e-spec.ts

import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import {
  newPipelinePhase,
  pipelinePhaseWrongData,
  updatePipelinePhaseData,
} from './pipelinePhase.const.e2e';

// Testes de criação
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

// Testes de listagem
it('Listando todas as Pipeline Phases', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('Listando todas as Pipeline Phases na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/pipeline-phases')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Listando todas as Pipeline Phases sem autenticação', async () => {
  return await request(app.getHttpServer()).get('/pipeline-phase').expect(401);
});

it('Listando uma Pipeline Phase pelo ID', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  expect(pipelinePhases).toBeInstanceOf(Array);
  expect(pipelinePhases.length).toBeGreaterThan(0);

  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .get(`/pipeline-phase/${pipelinePhaseId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

// Testes de atualização
it('Atualizando uma Pipeline Phase sem autenticação', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline-phase/${pipelinePhaseId}`)
    .send(updatePipelinePhaseData)
    .expect(401);
});

it('Atualizando uma Pipeline Phase com dados incorretos', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline-phase/${pipelinePhaseId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(pipelinePhaseWrongData)
    .expect(400);
});

it('Atualizando uma Pipeline Phase com sucesso', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .patch(`/pipeline-phase/${pipelinePhaseId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updatePipelinePhaseData)
    .expect(200);
});

// Testes de exclusão
it('Deletando uma Pipeline Phase sem autenticação', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline-phase/${pipelinePhaseId}`)
    .expect(401);
});

it('Deletando uma Pipeline Phase com sucesso', async () => {
  const response = await request(app.getHttpServer())
    .get('/pipeline-phase')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
  const pipelinePhases = Array.isArray(response.body)
    ? response.body
    : response.body.data;
  const pipelinePhaseId = pipelinePhases[0].id;

  return await request(app.getHttpServer())
    .delete(`/pipeline-phase/${pipelinePhaseId}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});
