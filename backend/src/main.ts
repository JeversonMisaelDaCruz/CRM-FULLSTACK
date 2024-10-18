import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe } from '@nestjs/common';
import { ConflictInterception } from './common/errors/interceptors/conflict.interceptors';
import { DatabaseInterception } from './common/errors/interceptors/database.interceptors';
import { NotFoundInterception } from './common/errors/interceptors/notFound.interceptors';
import { UnauthorizedInterception } from './common/errors/interceptors/unauthorized.interceptor';

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

  const port = process.env.PORT || 3001;
  await app.listen(port);
  Logger.log(` Server is running on: http://localhost:${port}`);
  return app;
}

bootstrap();
