import { HttpException, Injectable } from '@nestjs/common';
import { CreateDealDTO } from '../deal/dto/create-deal.dto';
import { UpdateDealDTO } from './dto/update-deal.dto';
import { DealRepository } from './repositories/deal.repository';
import { response } from 'express';
import { isUUID } from 'class-validator';

@Injectable()
export class DealService {
  constructor(private readonly DealRepository: DealRepository) {}

  async create(CreateDealDTO: CreateDealDTO) {
    try {
      const response = await this.DealRepository.create(CreateDealDTO);
      console.log('response on service:', response);
    } catch (error) {
      console.error('Error creating deal:', error);
    }
    return response;
  }

  async findAll() {
    return await this.DealRepository.findAll();
  }

  async findById(id: string) {
    try {
      if (!id || !isUUID(id)) {
        throw new HttpException('Deal nao encontrado', 404);
      }
      const response = await this.DealRepository.findById(id);
    } catch (error) {}
    return response;
  }

  async update(id: string, UpdateDealDTO: UpdateDealDTO) {
    return await this.DealRepository.update(id, UpdateDealDTO);
  }

  async remove(id: string) {
    return await this.DealRepository.remove(id);
  }
}
