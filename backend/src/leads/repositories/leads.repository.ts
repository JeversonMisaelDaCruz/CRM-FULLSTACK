import { HttpException, Injectable } from '@nestjs/common';
import { validate as isUUID } from 'uuid';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { LeadEntity } from '../entities/lead.entity';

@Injectable()
export class LeadsRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createLeadDto: CreateLeadDto): Promise<LeadEntity> {
    return await this.prismaService.lead.create({ data: createLeadDto });
  }
  async findAll(): Promise<LeadEntity[]> {
    return await this.prismaService.lead.findMany();
  }
  async findById(id: string): Promise<LeadEntity> {
    if (!id || !isUUID(id)) {
      throw new HttpException('Lead não encontrado', 404);
    }

    return await this.prismaService.lead.findUnique({
      where: {
        id: id,
      },
    });
  }

  async update(id: string, updateLead: UpdateLeadDto): Promise<LeadEntity> {
    if (!updateLead || Object.keys(updateLead).length === 0) {
      throw new HttpException('Não permitido campo vazio', 400);
    }
    if (!id || !isUUID(id)) {
      throw new HttpException('Lead não encontrado', 404);
    }
    return await this.prismaService.lead.update({
      where: { id: id },
      data: updateLead,
    });
  }
  async findByEmail(email: string): Promise<LeadEntity> {
    return this.prismaService.lead.findFirst({
      where: { email },
    });
  }
  async remove(id: string): Promise<LeadEntity> {
    return await this.prismaService.lead.delete({
      where: { id: id },
    });
  }
}
