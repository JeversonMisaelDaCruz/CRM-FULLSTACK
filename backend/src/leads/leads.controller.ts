import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsService } from './leads.service';
import { AuthGuard } from '../auth/auth.guard';

@Controller('leads')
export class LeadsController {
  constructor(private readonly leadsService: LeadsService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLeadDto: CreateLeadDto) {
    return this.leadsService.create(createLeadDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.leadsService.findAll();
  }
  @UseGuards(AuthGuard)
  @Get(':id')
  async findOne(@Param(':id') id: string) {
    await this.leadsService.findById(id);
  }
  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param(':id') id: string, @Body() updateLeadDto: UpdateLeadDto) {
    return this.leadsService.update(id, updateLeadDto);
  }
  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param(':id') id: string) {
    return this.leadsService.remove(id);
  }
}
