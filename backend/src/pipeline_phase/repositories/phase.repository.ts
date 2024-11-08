import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePipelinePhaseDto } from '../dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from '../dto/update-pipeline_phase.dto';
import { PipelinePhaseEntity } from '../entities/pipeline_phase.entity';

@Injectable()
export class PhaseRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(
    createPipelinePhaseDto: CreatePipelinePhaseDto,
  ): Promise<PipelinePhaseEntity> {
    return await this.prismaService.pipeline_Phase.create({
      data: createPipelinePhaseDto,
    });
  }
  async findAll(): Promise<PipelinePhaseEntity[]> {
    const response = await this.prismaService.pipeline_Phase.findMany({
      include: {
        pipeline: true,
      },
    });
    console.log(response);
    return response;
  }

  async findById(id: string): Promise<PipelinePhaseEntity> {
    const response = await this.prismaService.pipeline_Phase.findUnique({
      where: { id: id },
      include: {
        pipeline: true,
      },
    });
    console.log(response);
    return response;
  }

  async update(
    id: string,
    UpdatePipelinePhaseDto: UpdatePipelinePhaseDto,
  ): Promise<PipelinePhaseEntity> {
    const response = await this.prismaService.pipeline_Phase.update({
      where: { id: id },
      data: UpdatePipelinePhaseDto,
      include: {
        pipeline: true,
      },
    });
    console.log(response);
    return response;
  }

  async remove(id: string): Promise<PipelinePhaseEntity> {
    const response = await this.prismaService.pipeline_Phase.delete({
      where: { id: id },
    });
    console.log(response);
    return response;
  }
}
