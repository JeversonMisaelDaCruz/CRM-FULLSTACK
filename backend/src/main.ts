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
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
    }),
  );

  app.useGlobalInterceptors(new ConflictInterception());
  app.useGlobalInterceptors(new DatabaseInterception());
  app.useGlobalInterceptors(new UnauthorizedInterception());
  app.useGlobalInterceptors(new NotFoundInterception());
  app.useGlobalInterceptors(new EncryptIdentifierInterceptor());

  const port = process.env.PORT || 3001;
  await app.listen(port);
  console.log(`server running in ip: ${process.env.HOSTNAME || 'localhost'}:${port}`);


  return app;
}

bootstrap();
