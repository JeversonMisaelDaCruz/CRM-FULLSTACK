import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

const newUser = {
  name: 'teste',
  email: 'testeteste@gmail.com',
  identifier: '123456789101',
  password: '488531',
};

const dataUser = {
  name: 'teste',
  identifier: '123456789101',
  password: '488531',
};

const idUser = '01e72f2b-2db1-481d-b9b2-d75287f5acc7';

const idUserWrong = '01e72f2b-2db1-481d-b9b2-d75287f5acc8';

it('registrando usuario', async () => {
  return await request(app.getHttpServer())
    .post('/users/register')
    .set('Authorization', `Bearer ${authToken}`)
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
    .expect(404);
});

it('filtrando todos os usuarios', async () => {
  return await request(app.getHttpServer())
    .get('/users')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(201);
});

it('filtrando todos os usuarios rota incorreta', async () => {
  return await request(app.getHttpServer())
    .get('/user')
    .set('Authorization', `Bearer ${authToken}`)
    .expect(404);
});

it('filtrando todos os usuarios sem o token', async () => {
  return await request(app.getHttpServer()).get('/users').expect(404);
});

it('filtrando usuario especifico', async () => {
  return await request(app.getHttpServer())
    .get(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .expect(201);
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
  return await request(app.getHttpServer())
    .patch(`/users/${idUser}`)
    .set('Authorization', `Bearer ${authToken}`)
    .send(updateUser)
    .expect(201);
});
