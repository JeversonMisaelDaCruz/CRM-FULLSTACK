import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import { CreateDealEventDto } from '../dto/create-deal_event.dto';
import { UpdateDealEventDto } from '../dto/update-deal_event.dto';

@Injectable()
export class DealEventRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(CreateDealEventDto: CreateDealEventDto) {
    try {
      const createEvent = await this.prismaService.dealEvent.create({
        data: CreateDealEventDto,
      });
      console.log('response in repository:', createEvent);
      return createEvent;
    } catch (error) {
      console.error('Error creating deal event: in repository', error);
      throw error;
    }
  }

  async findAll() {
    try {
      const findAllEvent = await this.prismaService.dealEvent.findMany();
      console.log('findAllEvent:', findAllEvent);
      return findAllEvent;
    } catch (error) {
      console.error('Error finding alldeal events: in repository', error);
      throw error;
    }
  }

  async update(id: string, UpdateDealEventDto: UpdateDealEventDto) {
    try {
      const updateEvent = await this.prismaService.dealEvent.update({
        where: { id },
        data: UpdateDealEventDto,
      });
      return updateEvent;
    } catch (error) {
      console.error('Error updating deal event: in repository', error);
      throw error;
    }
  }

  async findById(id: string) {
    try {
      const response = await this.prismaService.dealEvent.findUnique({
        where: { id },
      });
      return response;
    } catch (error) {
      console.error('Error finding deal event by id: in repository', error);
      throw error;
    }
  }

  async delete(id: string) {
    try {
      const tryDelete = await this.prismaService.dealEvent.delete({
        where: { id },
      });
      console.log('sucessfuly deleted on repository', tryDelete);
      return tryDelete;
    } catch (error) {
      console.error('Error deleting deal event: in repository', error);
      throw error;
    }
  }
}
