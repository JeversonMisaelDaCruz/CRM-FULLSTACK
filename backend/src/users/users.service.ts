import { Injectable } from '@nestjs/common';
import { UsersRepository } from './repositories/user.repository';
import type { CreateUserDto } from './dto/create-user.dto';
import { NotFoundError } from 'src/common/errors/types/notFoundError';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  constructor(private readonly usersRepository: UsersRepository) {}

  async create(createUserDto: CreateUserDto) {
    const newUser = await this.usersRepository.create(createUserDto);
    return newUser;
  }

  async findAll() {
    return await this.usersRepository.findAll();
  }
  async findById(id: string) {
    const idQuery = await this.usersRepository.findById(id);
    if (!idQuery) {
      throw new NotFoundError(`${id}nao encontrado`);
    }
    return idQuery;
  }

  async update(id: string, UpdateUserDto: UpdateUserDto) {
    const idUser = await this.usersRepository.update(id, UpdateUserDto);
    if (!idUser) {
      throw new NotFoundError(`${id}nao encontrado`);
    }
    return idUser;
  }

  async remove(id: string) {
    const idUser = await this.usersRepository.remove(id);
    if (!idUser) {
      throw new NotFoundError(`${id}nao encontrado`);
    }
    return idUser;
  }
}
