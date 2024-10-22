import { Injectable } from '@nestjs/common';
import type { PrismaService } from 'src/prisma/prisma.service';
import type { CreateLeadDto } from '../dto/create-lead.dto';
import { LeadEntity } from '../entities/lead.entity';
import type { UpdateUserDto } from 'src/users/dto/update-user.dto';

@Injectable()
export class UserRepository {
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
  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.prismaService.lead.update({
      where: { id },
      data: updateUserDto,
    });
  }
}
