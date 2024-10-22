import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { AuthGuard } from './auth.guard';
import { PrismaService } from '../prisma/prisma.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UserModule } from '../users/users.module';
import { JwtStrategy } from './jwtStrategy';

@Module({
  imports: [
    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET || 'default_secret_key',
      signOptions: { expiresIn: '24h' },
    }),
    UserModule,
  ],
  providers: [AuthService, AuthGuard, PrismaService, JwtStrategy],
  controllers: [AuthController],
  exports: [AuthService, AuthGuard],
})
export class AuthModule {}
