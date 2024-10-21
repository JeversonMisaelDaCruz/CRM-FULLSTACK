import { NotFoundError } from 'src/common/errors/types/notFoundError';
import { UpdateUserDto } from './dto/update-user.dto';
import { CreateUserDto } from './dto/create-user.dto';
import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';

@Injectable()
export class UsersService {
  constructor(
    private prisma: PrismaService,
    readonly usersRepository: UsersRepository,
  ) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    const newUser = await this.usersRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });
    return newUser;
  }
  async findAll() {
    return await this.usersRepository.findAll();
  }

  async findByEmail(email: string) {
    const user = await this.usersRepository.findByEmail(email, 'password');
    if (!user) {
      throw new NotFoundError(`Usuário com email ${email} não encontrado`);
    }
    return user;
  }

  async findById(id: string) {
    const idQuery = await this.usersRepository.findById(id);
    if (!idQuery) {
      throw new NotFoundError(`${id} não encontrado`);
    }
    return idQuery;
  }

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    const idUser = await this.usersRepository.update(id, UpdateUserDto);
    if (!idUser) {
      throw new NotFoundError(`${id} não encontrado`);
    }
    return idUser;
  }

  async remove(id: string) {
    const idUser = await this.usersRepository.remove(id);
    if (!idUser) {
      throw new NotFoundError(`${id} não encontrado`);
    }
    return idUser;
  }
}
