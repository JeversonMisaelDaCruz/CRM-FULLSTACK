import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
@Module({
  imports: [ConfigModule.forRoot(), UserModule, AuthModule, LeadsModule],
  controllers: [AppController],
  providers: [AppService, PrismaService],
})
export class AppModule {}
