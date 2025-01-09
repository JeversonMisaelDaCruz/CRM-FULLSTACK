import { Injectable } from '@nestjs/common';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
import { DealEventRepository } from './repositories/dealevent.repository';
import { HttpErrorByCode } from '@nestjs/common/utils/http-error-by-code.util';

@Injectable()
export class DealEventService {
  constructor(private readonly dealEventRepository: DealEventRepository) {}

  async create(createDealEventDto: CreateDealEventDto) {
    const createEvent =
      await this.dealEventRepository.create(createDealEventDto);
    console.log('create event in service:', createEvent);
    return createEvent;
  }

  findAll() {
    return `This action returns all dealEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dealEvent`;
  }

  update(id: number, updateDealEventDto: UpdateDealEventDto) {
    return `This action updates a ${id} dealEvent`;
  }

  remove(id: number) {
    return `This action removes a ${id} dealEvent`;
  }
}
