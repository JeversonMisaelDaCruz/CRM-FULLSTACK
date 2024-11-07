import { HttpException, Injectable } from '@nestjs/common';
import { CreatePipelineDto } from '../dto/create-pipeline.dto';
import { PipelineEntity } from '../entities/pipeline.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePipelineDto } from '../dto/update-pipeline.dto';
import { isUUID } from 'class-validator';

@Injectable()
export class PipelineRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPipelineDto: CreatePipelineDto): Promise<PipelineEntity> {
    return await this.prismaService.pipeline.create({
      data: createPipelineDto,
    });
  }
  async findAll(): Promise<PipelineEntity[]> {
    const response = await this.prismaService.pipeline.findMany();
    console.log('pipeline encontrados:', response);
    return response;
  }
  async findById(id: string): Promise<PipelineEntity> {
    const response = await this.prismaService.pipeline.findUnique({
      where: { id: id },
    });
    console.log('pipeline encontrado:', response);
    return response;
  }
  async update(
    id: string,
    updatePipeline: UpdatePipelineDto,
  ): Promise<UpdatePipelineDto> {
    if (!updatePipeline || Object.keys(updatePipeline).length === 0) {
      throw new HttpException('Não permitido campo vazio', 400);
    }
    if (!id || !isUUID(id)) {
      throw new HttpException('Lead não encontrado', 404);
    }
    const response = await this.prismaService.pipeline.update({
      where: { id: id },
      data: updatePipeline,
    });
    console.log('pipeline atualizado:', response);
    return response;
  }
  async delete(id: string): Promise<PipelineEntity> {
    const response = await this.prismaService.pipeline.delete({
      where: { id: id },
    });
    console.log('pipeline deletado:', response);
    return response;
  }
}
