import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { PipelinePhaseService } from './pipeline_phase.service';
import { CreatePipelinePhaseDto } from './dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from './dto/update-pipeline_phase.dto';
import { AuthGuard } from '../auth/auth.guard';
@Controller('pipeline-phase')
export class PipelinePhaseController {
  constructor(private readonly pipelinePhaseService: PipelinePhaseService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPipelinePhaseDto: CreatePipelinePhaseDto) {
    const response = this.pipelinePhaseService.create(createPipelinePhaseDto);
    console.log("Response no controller",response)
    if (!response) {
      throw new Error('pipelinePhase not created');
    }
    return response;
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.pipelinePhaseService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelinePhaseService.findOne(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelinePhaseDto: UpdatePipelinePhaseDto,
  ) {
    return this.pipelinePhaseService.update(id, updatePipelinePhaseDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelinePhaseService.remove(id);
  }
}
