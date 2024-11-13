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
exports.PipelineRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
const class_validator_1 = require("class-validator");
let PipelineRepository = class PipelineRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createPipelineDto) {
        return await this.prismaService.pipeline.create({
            data: createPipelineDto,
        });
    }
    async findAll() {
        const response = await this.prismaService.pipeline.findMany();
        console.log('pipeline encontrados:', response);
        return response;
    }
    async findById(id) {
        const response = await this.prismaService.pipeline.findUnique({
            where: { id: id },
        });
        console.log('pipeline encontrado:', response);
        return response;
    }
    async update(id, updatePipeline) {
        if (!updatePipeline || Object.keys(updatePipeline).length === 0) {
            throw new common_1.HttpException('Não permitido campo vazio', 400);
        }
        if (!id || !(0, class_validator_1.isUUID)(id)) {
            throw new common_1.HttpException('Lead não encontrado', 404);
        }
        const response = await this.prismaService.pipeline.update({
            where: { id: id },
            data: updatePipeline,
        });
        console.log('pipeline atualizado:', response);
        return response;
    }
    async delete(id) {
        const response = await this.prismaService.pipeline.delete({
            where: { id: id },
        });
        console.log('pipeline deletado:', response);
        return response;
    }
};
exports.PipelineRepository = PipelineRepository;
exports.PipelineRepository = PipelineRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PipelineRepository);
//# sourceMappingURL=pipeline.repository.js.map