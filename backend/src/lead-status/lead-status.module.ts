import { Module } from '@nestjs/common';
import { LeadStatusService } from './lead-status.service';
import { LeadStatusController } from './lead-status.controller';
import { PrismaService } from 'src/prisma/prisma.service';
import { StatusLeadsRepository } from './repositories/leads-status.repository';


@Module({
  imports: [],
  controllers: [LeadStatusController],
  providers: [LeadStatusService, PrismaService,StatusLeadsRepository ],
  exports: [StatusLeadsRepository],
})
export class LeadStatusModule {}
