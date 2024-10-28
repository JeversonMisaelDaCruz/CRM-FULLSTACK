import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsRepository } from './repositories/leads.repository';

@Injectable()
export class LeadsService {
  constructor(private readonly leadsRepository: LeadsRepository) {}

  async create(createLeadDto: CreateLeadDto,) {
    const leadData = { ...createLeadDto};
    return await this.leadsRepository.create(leadData);
  }

  async findAll() {
    return await this.leadsRepository.findAll();
  }

  async findById(id: string) {
    const response = await this.leadsRepository.findById(id);
    if (!response) {
      throw new NotFoundException(`${id} nao encontrado`);
    }
    return response;
  }

  async findByEmail(email: string) {
    return await this.leadsRepository.findByEmail(email);
  }

  async update(id: string, updateLeadDto: UpdateLeadDto) {
    const response = await this.leadsRepository.update(id, updateLeadDto);
    if (!response) {
      throw new NotFoundException(`${id} nao encontrado`);
    }
  }

  async remove(id: string) {
    return await this.leadsRepository.remove(id);
  }
}
