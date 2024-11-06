import { Injectable } from '@nestjs/common';
import  { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadStatusDto } from '../dto/create-lead-status.dto';
import { LeadStatusEntity } from '../entities/lead-status.entity';

@Injectable()
export class StatusLeadsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(
    CreateLeadStatusDto: CreateLeadStatusDto,
  ): Promise<LeadStatusEntity> {
    const response = await this.prismaService.leadStatus.create({
      data: CreateLeadStatusDto,
    });
    console.log('leadStatus criado:', response);
    return response;
  }
  async findAll(): Promise<LeadStatusEntity[]> {
    const response = await this.prismaService.leadStatus.findMany();
    console.log('leadStatuses encontrados:', response);
    return response;
  }
}
