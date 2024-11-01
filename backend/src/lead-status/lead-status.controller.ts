import { Controller, Get } from '@nestjs/common';
import { LeadStatusService } from './lead-status.service';

@Controller('lead-status')
export class LeadStatusController {
  constructor(private readonly leadStatusService: LeadStatusService) {}

  @Get()
  async findAll() {
    return this.leadStatusService.findAll();
  }
}
