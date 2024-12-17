import { Module } from '@nestjs/common';
import { DealEventService } from './deal_event.service';
import { DealEventController } from './deal_event.controller';

@Module({
  controllers: [DealEventController],
  providers: [DealEventService],
})
export class DealEventModule {}
