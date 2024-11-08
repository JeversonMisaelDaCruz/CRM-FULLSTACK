import { Injectable } from '@nestjs/common';
import { CreatePipelinePhaseDto } from './dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from './dto/update-pipeline_phase.dto';

@Injectable()
export class PipelinePhaseService {
  create(createPipelinePhaseDto: CreatePipelinePhaseDto) {
    return 'This action adds a new pipelinePhase';
  }

  findAll() {
    return `This action returns all pipelinePhase`;
  }

  findOne(id: number) {
    return `This action returns a #${id} pipelinePhase`;
  }

  update(id: number, updatePipelinePhaseDto: UpdatePipelinePhaseDto) {
    return `This action updates a #${id} pipelinePhase`;
  }

  remove(id: number) {
    return `This action removes a #${id} pipelinePhase`;
  }
}
