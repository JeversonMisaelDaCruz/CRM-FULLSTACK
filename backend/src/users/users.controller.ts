import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Patch,
  Delete,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post('register')
  async create(@Body() createUserDto: CreateUserDto) {
    return await this.usersService.create(createUserDto);
  }
  @Get()
  async findAll() {
    return await this.usersService.findAll();
  }
  @Get(`:id`)
  async findById(@Param(`id`) id: string) {
    return await this.usersService.findById(id);
  }
  @Patch(':id')
  async update(@Param('id') id: string, @Body() UpdateUserDto: UpdateUserDto) {
    return await this.usersService.update(id, UpdateUserDto);
  }
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.usersService.remove(id);
  }
}
