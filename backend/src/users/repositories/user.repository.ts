import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<any> {
    return await this.prismaService.user.findUnique({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<any> {
    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }

  async remove(id: string): Promise<UserEntity> {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
