import { Injectable } from '@nestjs/common';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';

@Injectable()
export class DealEventService {
  create(createDealEventDto: CreateDealEventDto) {
    return 'This action adds a new dealEvent';
  }

  findAll() {
    return `This action returns all dealEvent`;
  }

  findOne(id: number) {
    return `This action returns a #${id} dealEvent`;
  }

  update(id: number, updateDealEventDto: UpdateDealEventDto) {
    return `This action updates a #${id} dealEvent`;
  }

  remove(id: number) {
    return `This action removes a #${id} dealEvent`;
  }
}
