import { Module } from '@nestjs/common';
import { PipelinePhaseService } from './pipeline_phase.service';
import { PipelinePhaseController } from './pipeline_phase.controller';
import { PhaseRepository } from './repositories/phase.repository';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  imports: [],
  controllers: [PipelinePhaseController],
  providers: [PipelinePhaseService, PrismaService, PhaseRepository],
  exports: [PhaseRepository],
})
export class PipelinePhaseModule {}
