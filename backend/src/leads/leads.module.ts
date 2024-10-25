import { Module } from '@nestjs/common';
import { LeadsService } from './leads.service';
import { LeadsController } from './leads.controller';
import { PrismaService } from '../prisma/prisma.service';
import { LeadsRepository } from './repositories/leads.repository';

@Module({
  imports: [],
  controllers: [LeadsController],
  providers: [LeadsService, PrismaService, LeadsRepository],
  exports: [LeadsRepository],
})
export class LeadsModule {}
