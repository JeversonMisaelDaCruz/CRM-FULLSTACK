import { HttpException, Injectable } from '@nestjs/common';
import { CreatePipelinePhaseDto } from './dto/create-pipeline_phase.dto';
import { PhaseRepository } from './repositories/phase.repository';
import { UpdatePipelinePhaseDto } from './dto/update-pipeline_phase.dto';

@Injectable()
export class PipelinePhaseService {
  constructor(private readonly phaseRepository: PhaseRepository) {}

  async create(createPipelinePhaseDto: CreatePipelinePhaseDto) {
    const response = this.phaseRepository.create(createPipelinePhaseDto);
    if (!response) {
      throw new HttpException('pipelinePhase not created', 400);
    }
    console.log('pipelinePhase service criado:', response);
    return response;
  }

  async findAll() {
    return this.phaseRepository.findAll();
  }

  async findOne(id: string) {
    const response = this.phaseRepository.findById(id);
    if (!response) {
      throw new HttpException('pipelinePhase not found', 404);
    }
  }

  async update(id: string, updatePipelinePhaseDto: UpdatePipelinePhaseDto) {
    const response = this.phaseRepository.update(id, updatePipelinePhaseDto);
    if (!response) {
      throw new HttpException('pipelinePhase not updated', 400);
    }
    console.log('pipelinePhase service atualizado:', response);
    return response;
  }

  async remove(id: string) {
    const response = this.phaseRepository.remove(id);
    if (!response) {
      throw new HttpException('pipelinePhase not deleted', 400);
    }
    console.log('pipelinePhase service deletado:', response);
    return response;
  }
}
