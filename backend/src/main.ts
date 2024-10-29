import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ConflictInterception } from './common/errors/interceptors/conflict.interceptors';
import { DatabaseInterception } from './common/errors/interceptors/database.interceptors';
import { NotFoundInterception } from './common/errors/interceptors/notFound.interceptors';
import { UnauthorizedInterception } from './common/errors/interceptors/unauthorized.interceptor';
import { EncryptIdentifierInterceptor } from './encrypt-identifier.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { cors: true });
  app.setGlobalPrefix('api');
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );
  app.enableCors({
    origin: 'http://localhost:3000', // Certifique-se de que o domínio está correto
    methods: 'GET,HEAD,PUT,PATCH,POST,DELETE',
    credentials: true, // Habilite se precisar de cookies
  });

  app.useGlobalInterceptors(new ConflictInterception());
  app.useGlobalInterceptors(new DatabaseInterception());
  app.useGlobalInterceptors(new UnauthorizedInterception());
  app.useGlobalInterceptors(new NotFoundInterception());
  app.useGlobalInterceptors(new EncryptIdentifierInterceptor());

  const port = process.env.PORT || 3001;
  await app.listen(port);

  return app;
}

bootstrap();
