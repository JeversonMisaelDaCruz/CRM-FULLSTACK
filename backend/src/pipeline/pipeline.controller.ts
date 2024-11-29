import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseGuards,
  Req,
  HttpException,
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
  async create(@Body() createPipelineDto: CreatePipelineDto) {
    return this.pipelineService.create(createPipelineDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll(@Req() req: any) {
    const GetuserId = req.user.id;
    if (!GetuserId) {
      throw new HttpException('Usuário não autenticado.', 401);
    }
    return this.pipelineService.findAll(GetuserId);
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param('id') id: string, @Req() req: any) {
    const GetuserId = req.user.id;
    if (!GetuserId) {
      throw new HttpException('Usuário não autenticado.', 401);
    }
    return this.pipelineService.findById(id, GetuserId);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updatePipelineDto: UpdatePipelineDto,
  ) {
    return this.pipelineService.update(id, updatePipelineDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return this.pipelineService.delete(id);
  }
}
