import { Body, Controller, Get, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '../auth/auth.guard';
import { CreateLeadStatusDto } from './dto/create-lead-status.dto';
import { LeadStatusService } from './lead-status.service';
@Controller('lead-status')
export class LeadStatusController {
  constructor(private readonly leadStatusService: LeadStatusService) {}
  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createLeadStatusDto: CreateLeadStatusDto) {
    return this.leadStatusService.create(createLeadStatusDto);
  }
  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.leadStatusService.findAll();
  }
}
