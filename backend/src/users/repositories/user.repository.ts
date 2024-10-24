import { PrismaService } from '../../prisma/prisma.service';
import { CreateUserDto } from '../dto/create-user.dto';
import { UserEntity } from '../entities/user.entity';
import { UpdateUserDto } from '../dto/update-user.dto';
import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  constructor(private readonly prismaService: PrismaService) {}

  async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    if (createUserDto.email && (await this.findByEmail(createUserDto.email))) {
      throw new HttpException('email ja existe ', 401);
    }
    if (
      createUserDto.identifier &&
      (await this.findByIdentifier(createUserDto.identifier))
    ) {
      throw new HttpException('identifer ja existe', 401);
    }
    return await this.prismaService.user.create({ data: createUserDto });
  }

  async findAll(): Promise<UserEntity[]> {
    return await this.prismaService.user.findMany();
  }

  async findById(id: string): Promise<UserEntity> {
    return await this.prismaService.user.findFirst({
      where: { id },
    });
  }

  async findByEmail(email: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: { email },
    });
  }

  async findByIdentifier(identifier: string): Promise<UserEntity> {
    return this.prismaService.user.findUnique({
      where: { identifier },
    });
  }

  async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    if (updateUserDto.email && (await this.findByEmail(updateUserDto.email))) {
      throw new HttpException('Email já existe', 401);
    }

    if (
      updateUserDto.identifier &&
      (await this.findByIdentifier(updateUserDto.identifier))
    ) {
      throw new HttpException('Identifier já existe', 401);
    }

    if (updateUserDto) {
      throw new HttpException('não permitido campo vazio', 400);
    }

    return await this.prismaService.user.update({
      where: { id },
      data: updateUserDto,
    });
  }
  async remove(id: string): Promise<UserEntity> {
    const response = await this.prismaService.user.delete({ where: { id } });
    if (!response) {
      throw new HttpException('user not found', 404);
    }
    return response;
  }
}
