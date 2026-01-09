import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
} from '@nestjs/common';
import { DealEventService } from './deal_event.service';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('deal-event')
export class DealEventController {
  constructor(private readonly dealEventService: DealEventService) {}

  @UseGuards(AuthGuard)
  @Post()
  async create(@Body() createDealEventDto: CreateDealEventDto) {
    return await this.dealEventService.create(createDealEventDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  async findAll() {
    return await this.dealEventService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  async findById(@Param('id') id: string) {
    return await this.dealEventService.findOne(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  async update(
    @Param('id') id: string,
    @Body() updateDealEventDto: UpdateDealEventDto,
  ) {
    return await this.dealEventService.update(id, updateDealEventDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.dealEventService.remove(id);
  }
}
