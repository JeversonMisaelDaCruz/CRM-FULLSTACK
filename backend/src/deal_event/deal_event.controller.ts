import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { DealEventService } from './deal_event.service';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';

@Controller('deal-event')
export class DealEventController {
  constructor(private readonly dealEventService: DealEventService) {}

  @Post()
  create(@Body() createDealEventDto: CreateDealEventDto) {
    return this.dealEventService.create(createDealEventDto);
  }

  @Get()
  findAll() {
    return this.dealEventService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealEventService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealEventDto: UpdateDealEventDto) {
    return this.dealEventService.update(+id, updateDealEventDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealEventService.remove(+id);
  }
}
