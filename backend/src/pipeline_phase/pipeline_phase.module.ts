import { Module } from '@nestjs/common';
import { PipelinePhaseService } from './pipeline_phase.service';
import { PipelinePhaseController } from './pipeline_phase.controller';

@Module({
  controllers: [PipelinePhaseController],
  providers: [PipelinePhaseService],
})
export class PipelinePhaseModule {}
