import { HttpException, Injectable } from '@nestjs/common';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { PipelineRepository } from './repositories/pipeline.repository';

@Injectable()
export class PipelineService {
  constructor(private readonly pipelineRepository: PipelineRepository) {}

  async create(createPipelineDto: CreatePipelineDto) {
    const response = await this.pipelineRepository.create(createPipelineDto);
    if (!response) {
      throw new HttpException('pipeline not created', 400);
    }
    console.log('pipeline criado:', response);
    return response;
  }

  async findAll() {
    const response = await this.pipelineRepository.findAll();
    if (!response) {
      throw new HttpException('pipeline not created', 400);
    }
    console.log('pipeline encontrados:', response);
    return response;
  }

  async findById(id: string) {
    const response = await this.pipelineRepository.findById(id);
    if (!response) {
      throw new HttpException('pipeline not created', 400);
    }
    console.log('pipeline encontrado:', response);
    return response;
  }

  async update(id: string, updatePipelineDto: UpdatePipelineDto) {
    const response = await this.pipelineRepository.update(
      id,
      updatePipelineDto,
    );
    if (!response) {
      throw new HttpException('pipeline not found', 404);
    }
    console.log('pipeline atualizado:', response);
    return response;
  }

  async remove(id: string) {
    const response = await this.pipelineRepository.delete(id);
    if (!response) {
      throw new HttpException('pipeline not created', 400);
    }
    console.log('pipeline deletado:', response);
    return response;
  }
}
