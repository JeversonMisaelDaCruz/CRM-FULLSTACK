import * as request from 'supertest';
import { app, authToken } from '../../global.e2e-spec';

it('criando um lead', async() => {
return await request(app.getHttpServer())
.post('/leads')
.set(`Authorization`, `Bearer ${authToken}`)

})