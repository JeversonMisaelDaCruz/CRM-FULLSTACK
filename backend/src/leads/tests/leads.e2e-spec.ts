import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import {
  leadId,
  leadMissingData,
  leadWrongId,
  newLead,
  updateLead,
} from './leads.const.e2e';

it('criando um lead faltando credenciais de autenticação', async () => {
  return await request(app.getHttpServer())
    .post('/leads')
    .send(newLead)
    .expect(401);
});

it('criando um lead com dados faltantes', async () => {
  return await request(app.getHttpServer())
    .post('/leads')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(leadMissingData)
    .expect(400);
});

it('criando um lead com a rota incorreta', async () => {
  return await request(app.getHttpServer())
    .post('/leadzinho')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(newLead)
    .expect(404);
});

it('criando um lead', async () => {
  return await request(app.getHttpServer())
    .post('/leads')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(newLead)
    .expect(201);
});

it('listando todos os leads', async () => {
  return await request(app.getHttpServer())
    .get('/leads')
    .set(`Authorization`, `Bearer ${authToken}`)
    .expect(200);
});

it('Buscando um lead especifico pelo id', async () => {
  console.log('ID usado para teste:', leadId);
  return await request(app.getHttpServer())
    .get(`/leads/${leadId}`)
    .set(`Authorization`, `Bearer ${authToken}`)
    .expect(200);
});

it('Buscando um lead especifico pelo id incorreto', async () => {
  return await request(app.getHttpServer())
    .get(`/leads/${leadWrongId}`)
    .set(`Authorization`, `Bearer ${authToken}`)
    .expect(404);
});

it('Buscando um lead especifico sem autenticação', async () => {
  return await request(app.getHttpServer()).get(`/leads/`).expect(401);
});

it('buscando um lead com a rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/leadsss')
    .set(`Authorization`, `Bearer ${authToken}`)
    .expect(404);
});

it('Atualizando informaçoes de um lead sem autenticação', async () => {
  return await request(app.getHttpServer())
    .patch(`/leads/${leadId}`)
    .send(updateLead)
    .expect(401);
});
it('Atualizando informaçoes de um lead na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .patch(`/leadsss/${leadId}`)
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(updateLead)
    .expect(404);
});
it('Atualizando informaçoes de um lead na rota incorreta', async () => {
  return await request(app.getHttpServer())
    .patch(`/leadsss/${leadId}`)
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(updateLead)
    .expect(404);
});
it('Atualizando informaçoes de um lead ', async () => {
  return await request(app.getHttpServer())
    .patch(`/leads/${leadId}`)
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(updateLead)
    .expect(200);
});
it('deletendo um lead sem autenticação', async () => {
  return await request(app.getHttpServer())
  .delete(`/leads/${leadId}`)
  .expect(401)
})

it('deletando um lead sem passar id', async () => {
  return await request(app.getHttpServer())
  .delete(`/leads/`)
  .set(`Authorization`, `Bearer ${authToken}`)
  .expect(400)
})


