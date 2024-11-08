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
import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { AuthGuard } from '../auth/auth.guard';


@Controller('pipeline')
export class PipelineController {
  constructor(private readonly pipelineService: PipelineService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelineService.create(createPipelineDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.pipelineService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.pipelineService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(id, updatePipelineDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.pipelineService.remove(id);
  }
}
