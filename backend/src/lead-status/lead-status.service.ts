import { Injectable } from '@nestjs/common';
import { CreateLeadStatusDto } from './dto/create-lead-status.dto';
import { StatusLeadsRepository } from './repositories/leads-status.repository';

@Injectable()
export class LeadStatusService {
  constructor(private readonly statusLeadsRepository: StatusLeadsRepository) {}

  async create(CreateLeadStatusDto: CreateLeadStatusDto) {
    const leadStatusData = { ...CreateLeadStatusDto };
    console.log('leadStatusData:', leadStatusData);
    return await this.statusLeadsRepository.create(leadStatusData);
  }

  async findAll() {
    return await this.statusLeadsRepository.findAll();
  }
}
