import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

export const newUser = {
  name: 'jeverson fernando',
  email: 'jeversonsolomon@gmail.com',
  identifier: '87641236920',
  password: '488531',
};

export const dataUser = {
  name: 'jeverson fernando',
  password: '488531',
};

export const idUser = '7ea69f3e-e280-42f1-b32c-e41554659a54';

export const idUserWrong = '01e72f2b-2db1-481d-b9b2-d75287f5acc8';

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
  const updateUser = {
    name: 'rogerio',
  };
  const response = await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(200);

  console.log('response', response.body);
  return response;
});
