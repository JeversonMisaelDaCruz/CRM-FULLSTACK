import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';
import { NotFoundException } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log('Hashed Password:', hashedPassword);

    const cpf = createUserDto.identifier.replace(/[^0-9]/g, '');
    if (cpf.length !== 11) {
      throw new Error('O CPF deve conter exatamente 11 dígitos.');
    }

    return await this.userRepository.create({
      ...createUserDto,
      identifier: cpf,
      password: hashedPassword,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    const response = await this.userRepository.findById(id);
    if (!response) {
      throw new NotFoundException(`${id} nao encontrado`);
    }
    return response;
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const cpf = updateUserDto.identifier?.replace(/[^0-9]/g, '');
    const updatedUserDto = {
      ...updateUserDto,
      identifier: cpf,
    };

    return await this.userRepository.update(id, updatedUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
