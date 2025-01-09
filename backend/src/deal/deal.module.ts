import { Module } from '@nestjs/common';
import { DealService } from './deal.service';
import { DealController } from './deal.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DealRepository } from './repositories/deal.repository';

@Module({
  imports: [],
  controllers: [DealController],
  providers: [DealService, PrismaService, DealRepository],
  exports: [DealRepository],
})
export class DealModule {}
