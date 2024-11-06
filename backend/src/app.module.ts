import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
import { LeadStatusModule } from './lead-status/lead-status.module';
import { PipelineModule } from './pipeline/pipeline.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    LeadsModule,
    LeadsModule,
    LeadStatusModule,
    PipelineModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
