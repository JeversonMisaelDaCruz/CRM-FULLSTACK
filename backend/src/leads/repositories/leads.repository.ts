import { HttpException, Injectable } from '@nestjs/common';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { LeadEntity } from '../entities/lead.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

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
    return await this.prismaService.lead.findUnique({
      where: { id },
    });
  }
  async update(id: string, updateUserDto: UpdateUserDto): Promise<LeadEntity> {
    if (updateUserDto) {
      throw new HttpException('não permitido campo vazio', 400);
    }
    return await this.prismaService.lead.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async findByEmail(email: string): Promise<LeadEntity> {
    return this.prismaService.lead.findFirst({
      where: { email },
    });
  }
  async remove(id: string): Promise<LeadEntity> {
    return await this.prismaService.lead.delete({
      where: { id },
    });
  }
}
