import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';
import { response } from 'express';

const updateUser = {
  email: 'jeversonsolomon@gmail.com',
  identifer: '87641236920',
};
const newUser = {
  name: 'teste teste',
  email: 'teste@gmail.com',
  identifier: '01710484908',
  password: '488531',
};
const dataUser = {
  name: 'jeverson fernando',
  password: '488531',
};

const idUser = 'e78eccf4-7414-4c6c-b5d7-61d6712030a2';
const idUserWrong = '01e72f2b-2db1-481d-b9b2-d75287f5acc8';
const idUserDelete = '0f77bb0a-b4c6-43a8-b096-c93ec78df772';

it('Registrando um usuário', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set(`Authorization`, `Bearer ${authToken}`)
    .send(newUser)
    .expect(201);
});

it('registrando usuario com o mesmo email e identifer', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(401);
});

it('registrando usuario faltando campo', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set('Authorization', `Bearer ${authToken}`)
    .send(dataUser)
    .expect(400);
});

it('registrando usuario rota incorreta', async () => {
  return await request(app.getHttpServer())
    .post('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .send(newUser)
    .expect(404);
});

it('registrando usuario sem token', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .send(newUser)
    .expect(401);
});

it('filtrando todos os usuarios', async () => {
  return await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('filtrando todos os usuarios rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/user')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('filtrando todos os usuarios sem o token', async () => {
  return await request(app.getHttpServer()).get('/users').expect(401);
});

it('filtrando usuario especifico', async () => {
  return await request(app.getHttpServer())
    .get(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(200);
});

it('filtrando usuario especifico id incorreto', async () => {
  return await request(app.getHttpServer())
    .get(`/users/${idUserWrong}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('filtrando usuario especifico com rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get(`/user/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('filtrando usuario especifico faltando token', async () => {
  return await request(app.getHttpServer()).get(`/user/${idUser}`).expect(404);
});

it('atualizando um usuario especifico', async () => {
  const response = await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(400);

  console.log('response', response.body);
  return response;
});

it('atualizando usuario faltando token', async () => {
  const updateUser = {
    name: 'rogerio',
  };
  const reponse = await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .send(updateUser)
    .expect(401);

  console.log(`response`, reponse.body);
  return response;
});

it('Atualizando usuario com email e cpf existente', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(400);
});

it('Atualizando usuario especifico sem passar data', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send({})
    .expect(400);
});

it('Registrando um usuário especifico sem passar id', async () => {
  return await request(app.getHttpServer())
    .patch(`/users/`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(404);
});

it('Deletando um usuario', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/${idUserDelete}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(idUser)
    .expect(200);
});

it('Deletando um usuario sem passar id', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});
it('Deletando um usario faltando token', async () => {
  return await request(app.getHttpServer())
    .delete(`/users/${idUserDelete}`)
    .send(idUser)
    .expect(401);
});
