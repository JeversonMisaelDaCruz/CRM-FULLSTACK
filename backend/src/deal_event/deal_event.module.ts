import { Module } from '@nestjs/common';
import { DealEventService } from './deal_event.service';
import { DealEventController } from './deal_event.controller';
import { PrismaService } from '../prisma/prisma.service';
import { DealEventRepository } from './repositories/dealevent.repository';

@Module({
  imports: [],
  controllers: [DealEventController],
  providers: [DealEventService, PrismaService, DealEventRepository],
  exports: [DealEventRepository],
})
export class DealEventModule {}
