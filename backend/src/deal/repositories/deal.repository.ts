import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDealDTO } from '../dto/create-deal.dto';
import { UpdateDealDTO } from '../dto/update-deal.dto';

@Injectable()
export class DealRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(CreateDealDTO: CreateDealDTO) {
    try {
      const response = await this.prismaService.deal.create({
        data: CreateDealDTO,
      });
      return response;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const response = await this.prismaService.deal.findMany();
      return response;
    } catch (error) {
      console.error('Error finding all deals:', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.prismaService.deal.findUnique({
        where: { id },
      });
      return response;
    } catch (error) {
      console.error('Error finding deal by id:', error);
      throw error;
    }
  }

  async remove(id: string) {
    try {
      const response = await this.prismaService.deal.delete({
        where: { id },
      });
      return response;
    } catch (error) {
      console.error('Error removing deal:', error);
      throw error;
    }
  }

  async update(id: string, updateDealDto: UpdateDealDTO) {
    try {
      const response = await this.prismaService.deal.update({
        where: { id },
        data: updateDealDto,
      });
      return response;
    } catch (error) {
      console.error('Error updating deal:', error);
      throw error;
    }
  }
}
