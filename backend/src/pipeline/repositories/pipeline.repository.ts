import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreatePipelineDto } from '../dto/create-pipeline.dto';
import { UpdatePipelineDto } from '../dto/update-pipeline.dto';

@Injectable()
export class PipelineRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createPipelineDto: CreatePipelineDto) {
    const { name, userIds } = createPipelineDto;
    console.log('createPipelineDto no repository:', createPipelineDto);
    const pipeline = await this.prismaService.pipeline.create({
      data: { name },
    });

    console.log('pipeline criado:', pipeline);
    const associationsIdWithPipeline = userIds.map((userId) => ({
      pipeline_id: pipeline.id,
      user_id: userId,
    }));

    await this.prismaService.pipeline_User.createMany({
      data: associationsIdWithPipeline,
    });
    console.log('associationsIdWithPipeline:', associationsIdWithPipeline);

    return pipeline;
  }

  async findById(id: string) {
    return await this.prismaService.pipeline.findUnique({
      where: { id },
    });
  }

  async findByUser(userId: string) {
    return await this.prismaService.pipeline.findMany({
      where: {
        users: {
          some: { user_id: userId },
        },
      },
      include: {
        phases: true,
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async findByIdAndUser(pipelineId: string, userId: string) {
    return await this.prismaService.pipeline.findFirst({
      where: {
        id: pipelineId,
        users: {
          some: { user_id: userId },
        },
      },
      include: {
        users: {
          select: {
            user: {
              select: {
                id: true,
                name: true,
                email: true,
              },
            },
          },
        },
      },
    });
  }

  async update(id: string, updatePipelineDto: UpdatePipelineDto) {
    return await this.prismaService.pipeline.update({
      where: { id },
      data: updatePipelineDto,
    });
  }

  async delete(id: string) {
    return await this.prismaService.pipeline.delete({
      where: { id },
    });
  }
}
