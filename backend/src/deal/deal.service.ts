import { HttpException, Injectable } from '@nestjs/common';
import { CreateDealDTO } from '../deal/dto/create-deal.dto';
import { UpdateDealDTO } from './dto/update-deal.dto';
import { DealRepository } from './repositories/deal.repository';
import { isUUID } from 'class-validator';

@Injectable()
export class DealService {
  constructor(private readonly dealRepository: DealRepository) {}

  async create(CreateDealDTO: CreateDealDTO) {
    try {
      const createdDeal = await this.dealRepository.create(CreateDealDTO);
      console.log('Created deal:', createdDeal);
      return createdDeal;
    } catch (error) {
      console.error('Error creating deal:', error);
      throw new HttpException('Erro ao criar deal', 500);
    }
  }

  async findAll() {
    try {
      const deals = await this.dealRepository.findAll();
      console.log('Deals retrieved:', deals);
      return deals;
    } catch (error) {
      throw new HttpException('Nenhum deal encontrado', 404);
    }
  }

  async findById(id: string) {
    try {
      if (!id || !isUUID(id)) {
        throw new HttpException('ID inválido ou deal não encontrado', 404);
      }
      const deal = await this.dealRepository.findById(id);
      if (!deal) {
        throw new HttpException('Deal não encontrado', 404);
      }
      return deal;
    } catch (error) {
      console.error('Error finding deal by ID:', error);
      throw new HttpException('Erro ao buscar deal', 500);
    }
  }

  async update(id: string, UpdateDealDTO: UpdateDealDTO) {
    try {
      const updatedDeal = await this.dealRepository.update(id, UpdateDealDTO);
      if (!updatedDeal) {
        throw new HttpException('Deal não encontrado', 404);
      }
      console.log('Updated deal:', updatedDeal);
      return updatedDeal;
    } catch (error) {
      console.error('Error updating deal:', error);
      throw new HttpException('Erro ao atualizar deal', 500);
    }
  }

  async remove(id: string) {
    try {
      const removedDeal = await this.dealRepository.remove(id);
      if (!removedDeal) {
        throw new HttpException('Deal não encontrado', 404);
      }
      console.log('Removed deal:', removedDeal);
      return removedDeal;
    } catch (error) {
      console.error('Error removing deal:', error);
      throw new HttpException('Erro ao remover deal', 500);
    }
  }
}
