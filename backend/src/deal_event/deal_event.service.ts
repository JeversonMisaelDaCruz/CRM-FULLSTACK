import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
import { DealEventRepository } from './repositories/dealevent.repository';

@Injectable()
export class DealEventService {
  constructor(private readonly dealEventRepository: DealEventRepository) {}

  async create(createDealEventDto: CreateDealEventDto) {
    const createEvent =
      await this.dealEventRepository.create(createDealEventDto);
    console.log('create event in service:', createEvent);
    return createEvent;
  }

  async findAll() {
    const events = await this.dealEventRepository.findAll();
    return events;
  }

  async findOne(id: string) {
    const event = await this.dealEventRepository.findById(id);
    if (!event) {
      throw new NotFoundException(`DealEvent with ID ${id} not found`);
    }
    return event;
  }

  async update(id: string, updateDealEventDto: UpdateDealEventDto) {
    const existingEvent = await this.dealEventRepository.update(
      id,
      updateDealEventDto,
    );
    if (!existingEvent) {
      throw new NotFoundException(`DealEvent with ID ${id} not found`);
    }

    const updatedEvent = await this.dealEventRepository.update(
      id,
      updateDealEventDto,
    );
    return updatedEvent;
  }

  async remove(id: string) {
    const existingEvent = await this.dealEventRepository.findById(id);
    if (!existingEvent) {
      throw new NotFoundException(`DealEvent with ID ${id} not found`);
    }

    await this.dealEventRepository.delete(id);
    return { message: `DealEvent with ID ${id} removed successfully` };
  }
}
