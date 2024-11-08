import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PipelinePhaseService } from './pipeline_phase.service';
import { CreatePipelinePhaseDto } from './dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from './dto/update-pipeline_phase.dto';

@Controller('pipeline-phase')
export class PipelinePhaseController {
  constructor(private readonly pipelinePhaseService: PipelinePhaseService) {}

  @Post()
  create(@Body() createPipelinePhaseDto: CreatePipelinePhaseDto) {
    return this.pipelinePhaseService.create(createPipelinePhaseDto);
  }

  @Get()
  findAll() {
    return this.pipelinePhaseService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelinePhaseService.findOne(+id);
  }

  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelinePhaseDto: UpdatePipelinePhaseDto,
  ) {
    return this.pipelinePhaseService.update(+id, updatePipelinePhaseDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelinePhaseService.remove(+id);
  }
}
