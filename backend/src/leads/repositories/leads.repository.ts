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
    const response = await this.prismaService.lead.create({
      data: createLeadDto,
      include: {
        user: true,
        pipeline_phase: true,
      },
    });
    console.log('Lead criado:', response);
    return response;
  }

  async findAll(): Promise<LeadEntity[]> {
    const leads = await this.prismaService.lead.findMany({
      include: {
        user: true,
        pipeline_phase: true,
      },
    });

    console.log('Dados retornados dos leads:', leads);
    return leads;
  }

  async findById(id: string): Promise<LeadEntity> {
    if (!id || !isUUID(id)) {
      throw new HttpException('Lead não encontrado', 404);
    }

    return await this.prismaService.lead.findUnique({
      where: {
        id: id,
      },
      include: {
        user: true,
        pipeline_phase: true,
      },
    });
  }

  async update(id: string, updateLead: UpdateLeadDto): Promise<LeadEntity> {
    if (!updateLead || Object.keys(updateLead).length === 0) {
      throw new HttpException('Não permitido campo vazio', 400);
    }

    const RemoveNotUsedData = Object.fromEntries(
      Object.entries(updateLead).filter(([_, value]) => value !== ''),
    );

    try {
      return await this.prismaService.lead.update({
        where: { id: id },
        data: RemoveNotUsedData,
        include: {
          user: true,
          pipeline_phase: true,
        },
      });
    } catch (error) {
      console.error('Erro ao atualizar lead no repositório:', error);
      throw new HttpException('Erro ao atualizar lead', 500);
    }
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
