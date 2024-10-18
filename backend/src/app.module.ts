import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { UsersModule } from './users/users.module';
import { PrismaModule } from './prisma/prisma.module';

@Module({
  imports: [
    AuthModule, // Importa o módulo de autenticação
    UsersModule, // Importa o módulo de usuários
    PrismaModule, // Importa o PrismaModule (ou outro módulo de banco de dados)
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
