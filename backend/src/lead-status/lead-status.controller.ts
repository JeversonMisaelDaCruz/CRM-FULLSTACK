import { Controller, Get, UseGuards } from '@nestjs/common';
import { LeadStatusService } from './lead-status.service';
import { AuthGuard } from '@nestjs/passport';

@Controller('lead-status')
export class LeadStatusController {
  constructor(private readonly leadStatusService: LeadStatusService) {}
  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return this.leadStatusService.findAll();
  }
}
