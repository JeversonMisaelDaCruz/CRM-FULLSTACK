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
import { DealService } from './deal.service';
import { CreateDealDTO } from './dto/create-deal.dto';
import { UpdateDealDTO } from './dto/update-deal.dto';
import { AuthGuard } from '../auth/auth.guard';

@Controller('deals')
export class DealController {
  constructor(private readonly dealService: DealService) {}

  @UseGuards(AuthGuard)
  @Post()
  create(@Body() createDealDto: CreateDealDTO) {
    return this.dealService.create(createDealDto);
  }

  @UseGuards(AuthGuard)
  @Get()
  findAll() {
    return this.dealService.findAll();
  }

  @UseGuards(AuthGuard)
  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.dealService.findById(id);
  }

  @UseGuards(AuthGuard)
  @Patch(':id')
  update(@Param('id') id: string, @Body() updateDealDto: UpdateDealDTO) {
    return this.dealService.update(id, updateDealDto);
  }

  @UseGuards(AuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.dealService.remove(id);
  }
}
