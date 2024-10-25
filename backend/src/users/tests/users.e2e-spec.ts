import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import {
  newUser,
  dataUser,
  idUser,
  idUserWrong,
  updateUser,
  idUserDelete,
} from './const.e2e';

it('Registrando um usuário', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(newUser)
    .expect(201);
});

it('Registrando usuário com o mesmo email e identifier', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(401);
});

it('Registrando usuário faltando campo', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(dataUser)
    .expect(400);
});

it('Registrando usuário em rota incorreta', async () => {
  return await request(app.getHttpServer())
    .post('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(404);
});

it('Registrando usuário sem token', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .send(newUser)
    .expect(401);
});

it('Filtrando todos os usuários', async () => {
  return await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('Filtrando todos os usuários - rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/user')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Filtrando todos os usuários sem o token', async () => {
  return await request(app.getHttpServer()).get('/users').expect(401);
});

it('Filtrando usuário específico', async () => {
  return await request(app.getHttpServer())
    .get(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('Filtrando usuário específico com id incorreto', async () => {
  return await request(app.getHttpServer())
    .get(`/users/${idUserWrong}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Filtrando usuário específico em rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get(`/user/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Filtrando usuário específico sem token', async () => {
  return await request(app.getHttpServer()).get(`/user/${idUser}`).expect(404);
});

it('Atualizando um usuário específico', async () => {
  const response = await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(400);

  console.log('response', response.body);
  return response;
});

it('Atualizando usuário sem token', async () => {
  const updateUser = {
    name: 'rogerio',
  };
  const response = await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .send(updateUser)
    .expect(401);

  console.log(`response`, response.body);
  return response;
});

it('Atualizando usuário com email e cpf existente', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(400);
});

it('Atualizando usuário específico sem passar data', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({})
    .expect(400);
});

it('Atualizando usuário específico sem passar id', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(404);
});

it('Deletando um usuário', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/${idUserDelete}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(idUser)
    .expect(200);
});

it('Deletando um usuário sem passar id', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('Deletando um usuário sem token', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/${idUserDelete}`)
    .send(idUser)
    .expect(401);
});
