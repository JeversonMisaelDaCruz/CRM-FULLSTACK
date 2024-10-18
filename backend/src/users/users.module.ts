import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UsersRepository } from './repositories/user.repository';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [UsersService, PrismaService, UsersRepository],
  exports: [],
})
export class UsersModule {}
