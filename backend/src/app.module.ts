import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
import { LeadStatusModule } from './lead-status/lead-status.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { PipelinePhaseModule } from './pipeline_phase/pipeline_phase.module';


@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    LeadsModule,
    LeadsModule,
    LeadStatusModule,
    PipelineModule,
    PipelinePhaseModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
