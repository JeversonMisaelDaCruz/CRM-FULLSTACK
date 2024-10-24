import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 0);
    console.log('Hashed Password:', hashedPassword);

    return await this.userRepository.create({
      ...createUserDto,
      identifier: createUserDto.identifier.replace(/[ˆ0-9]/g, ''),
      password: hashedPassword,
    });
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    const updatedUserDto = {
      ...updateUserDto,
      identifier: updateUserDto.identifier.replace(/[ˆ0-9]/g, ''),
    };

    return await this.userRepository.update(id, updatedUserDto);
  }
  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
