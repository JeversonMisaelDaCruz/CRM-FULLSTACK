import { Injectable } from '@nestjs/common';
import  { PrismaService } from '../prisma/prisma.service';


@Injectable()
export class LeadStatusService {
  constructor(private readonly prismaService: PrismaService) {}

  async findAll() {
    const response = this.prismaService.leadStatus.findMany();
    console.log(response)
    return response
  }
}
