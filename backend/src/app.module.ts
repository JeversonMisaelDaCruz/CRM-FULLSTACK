import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
import { AuthModule } from './auth/auth.module';
import { ConfigModule } from '@nestjs/config';
import { LeadsModule } from './leads/leads.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, LeadsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
