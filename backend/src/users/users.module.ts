import { Module } from '@nestjs/common';
import { UserService } from './users.service';
import { UserController } from './users.controller';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from './repositories/user.repository';

@Module({
  imports: [],
  controllers: [UserController],
  providers: [UserService, PrismaService, UserRepository],
  exports: [UserRepository],
})
export class UserModule {}
