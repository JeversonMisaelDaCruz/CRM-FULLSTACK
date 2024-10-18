import { Injectable } from '@nestjs/common';
import { PrismaService } from '../../prisma/prisma.service';
import type { CreateUserDto } from '../dto/create-user.dto';
import type { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';

@Injectable()
export class UsersRepository {
  constructor(private readonly prismaService: PrismaService) {}
  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return await this.prismaService.user.create({ data: createUserDto });
  }
  async findAll(): Promise<UserEntity[]> {
    const query: any = {
      select: {
        id: true,
        name: true,
        email: true,
      },
    };
    return await this.prismaService.user.findMany(query);
  }

  async findById(id: string): Promise<any> {
    const dataUser = await this.prismaService.user.findUnique({
      where: { id },
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
    return dataUser;
  }
  async update(id: string, UpdateUserDto: UpdateUserDto): Promise<any> {
    return await this.prismaService.user.update({
      where: { id },
      data: UpdateUserDto,
      select: {
        id: true,
        name: true,
        email: true,
      },
    });
  }
  async remove(id: string): Promise<UserEntity> {
    return await this.prismaService.user.delete({ where: { id } });
  }
}
