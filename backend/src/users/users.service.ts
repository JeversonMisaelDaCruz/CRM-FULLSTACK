import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserRepository } from './repositories/user.repository';
import * as bcrypt from 'bcryptjs';

@Injectable()
export class UserService {
  constructor(private readonly userRepository: UserRepository) {}

  async create(createUserDto: CreateUserDto) {
    const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
    console.log('Hashed Password:', hashedPassword);

    const newUser = await this.userRepository.create({
      ...createUserDto,
      password: hashedPassword,
    });

    const { password, ...dataUser } = newUser;
    return dataUser;
  }

  async findAll() {
    return await this.userRepository.findAll();
  }

  async findById(id: string) {
    return await this.userRepository.findById(id);
  }

  async update(id: string, updateUserDto: UpdateUserDto) {
    return await this.userRepository.update(id, updateUserDto);
  }

  async remove(id: string) {
    return await this.userRepository.remove(id);
  }
}
