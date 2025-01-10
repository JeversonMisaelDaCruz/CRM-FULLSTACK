"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealService = void 0;
const common_1 = require("@nestjs/common");
const deal_repository_1 = require("./repositories/deal.repository");
const class_validator_1 = require("class-validator");
let DealService = class DealService {
    constructor(dealRepository) {
        this.dealRepository = dealRepository;
    }
    async create(CreateDealDTO) {
        try {
            const createdDeal = await this.dealRepository.create(CreateDealDTO);
            console.log('Created deal:', createdDeal);
            return createdDeal;
        }
        catch (error) {
            console.error('Error creating deal:', error);
            throw new common_1.HttpException('Erro ao criar deal', 500);
        }
    }
    async findAll() {
        try {
            const deals = await this.dealRepository.findAll();
            console.log('Deals retrieved:', deals);
            return deals;
        }
        catch (error) {
            throw new common_1.HttpException('Nenhum deal encontrado', 404);
        }
    }
    async findById(id) {
        try {
            if (!id || !(0, class_validator_1.isUUID)(id)) {
                throw new common_1.HttpException('ID inválido ou deal não encontrado', 404);
            }
            const deal = await this.dealRepository.findById(id);
            if (!deal) {
                throw new common_1.HttpException('Deal não encontrado', 404);
            }
            return deal;
        }
        catch (error) {
            console.error('Error finding deal by ID:', error);
            throw new common_1.HttpException('Erro ao buscar deal', 500);
        }
    }
    async update(id, UpdateDealDTO) {
        try {
            const updatedDeal = await this.dealRepository.update(id, UpdateDealDTO);
            if (!updatedDeal) {
                throw new common_1.HttpException('Deal não encontrado', 404);
            }
            console.log('Updated deal:', updatedDeal);
            return updatedDeal;
        }
        catch (error) {
            console.error('Error updating deal:', error);
            throw new common_1.HttpException('Erro ao atualizar deal', 500);
        }
    }
    async remove(id) {
        try {
            const removedDeal = await this.dealRepository.remove(id);
            if (!removedDeal) {
                throw new common_1.HttpException('Deal não encontrado', 404);
            }
            console.log('Removed deal:', removedDeal);
            return removedDeal;
        }
        catch (error) {
            console.error('Error removing deal:', error);
            throw new common_1.HttpException('Erro ao remover deal', 500);
        }
    }
};
exports.DealService = DealService;
exports.DealService = DealService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [deal_repository_1.DealRepository])
], DealService);
//# sourceMappingURL=deal.service.js.map