import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { LeadsModule } from './leads/leads.module';
import { PrismaService } from './prisma/prisma.service';
import { UserModule } from './users/users.module';
import { PipelineModule } from './pipeline/pipeline.module';
import { PipelinePhaseModule } from './pipeline_phase/pipeline_phase.module';
import { DealModule } from './deal/deal.module';
import { DealEventModule } from './deal_event/deal_event.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    UserModule,
    AuthModule,
    LeadsModule,
    LeadsModule,
    PipelineModule,
    PipelinePhaseModule,
    DealModule,
    DealEventModule,
  ],
  providers: [PrismaService],
})
export class AppModule {}
