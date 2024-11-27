import { Injectable, HttpException } from '@nestjs/common';
import { PipelineRepository } from './repositories/pipeline.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';

@Injectable()
export class PipelineService {
  constructor(
    private readonly pipelineRepository: PipelineRepository,
    private readonly prismaService: PrismaService,
  ) {}

  async create(createPipelineDto: CreatePipelineDto) {
    const { userIds } = createPipelineDto;

    // Validar se todos os usuários existem
    const users = await this.prismaService.user.findMany({
      where: {
        id: { in: userIds },
      },
    });

    if (users.length !== userIds.length) {
      throw new HttpException(
        'Um ou mais IDs de usuário fornecidos não existem.',
        400,
      );
    }

    return await this.pipelineRepository.create(createPipelineDto);
  }

  async findAll(userId: string) {
    const pipelines = await this.pipelineRepository.findByUser(userId);
    if (!pipelines.length) {
      throw new HttpException(
        'Nenhuma pipeline encontrada para este usuário.',
        404,
      );
    }
    return pipelines;
  }

  async findById(pipelineId: string, userId: string) {
    const pipeline = await this.pipelineRepository.findByIdAndUser(
      pipelineId,
      userId,
    );
    if (!pipeline) {
      throw new HttpException(
        'Pipeline não encontrada ou acesso não autorizado.',
        404,
      );
    }
    return pipeline;
  }

  async update(id: string, updatePipelineDto: UpdatePipelineDto) {
    return await this.pipelineRepository.update(id, updatePipelineDto);
  }

  async delete(id: string) {
    return await this.pipelineRepository.delete(id);
  }
}
