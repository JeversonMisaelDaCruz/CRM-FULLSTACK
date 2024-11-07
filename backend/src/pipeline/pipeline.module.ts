import { Module } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { PipelineController } from './pipeline.controller';
import { PipelineService } from './pipeline.service';
import { PipelineRepository } from './repositories/pipeline.repository';

@Module({
  imports: [],
  controllers: [PipelineController],
  providers: [PipelineService, PrismaService, PipelineRepository],
  exports: [PipelineRepository],
})
export class PipelineModule {}
