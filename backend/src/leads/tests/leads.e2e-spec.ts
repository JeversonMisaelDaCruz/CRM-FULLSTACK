import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import { leadMissingData, newLead } from './leads.const.e2e';

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

