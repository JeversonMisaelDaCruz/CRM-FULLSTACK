import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { DealEventService } from './deal_event.service';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';

@Controller('deal-event')
export class DealEventController {
  constructor(private readonly dealEventService: DealEventService) {}

  @Post()
  async create(@Body() createDealEventDto: CreateDealEventDto) {
    const response = await this.dealEventService.create(createDealEventDto);
  }

  @Get()
  async findAll() {
    const response = await this.dealEventService.findAll();
  }

  @Get(':id')
  async findById(@Param('id') id: string) {
    const response = await this.dealEventService.findOne(id);
  }

  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDealEventDto: UpdateDealEventDto,
  ) {
    const response = await this.dealEventService.update(id, updateDealEventDto);
  }

  @Delete(':id')
  async remove(@Param('id') id: string) {
    const response = await this.dealEventService.remove(id);
  }
}
