import { Module } from '@nestjs/common';
import { PrismaService } from './prisma.service';

@Module({
  providers: [PrismaService], // Provedor do PrismaService
  exports: [PrismaService], // Exporta o PrismaService para ser usado em outros módulos
})
export class PrismaModule {}
