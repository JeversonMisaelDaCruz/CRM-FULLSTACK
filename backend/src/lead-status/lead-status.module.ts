import { Module } from '@nestjs/common';
import { LeadStatusService } from './lead-status.service';
import { PrismaService } from '../prisma/prisma.service';
import { LeadStatusController } from './lead-status.controller';

@Module({
  controllers: [LeadStatusController],
  providers: [LeadStatusService, PrismaService],
})
export class LeadStatusModule {}
