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
exports.PipelineService = void 0;
const common_1 = require("@nestjs/common");
const pipeline_repository_1 = require("./repositories/pipeline.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let PipelineService = class PipelineService {
    constructor(pipelineRepository, prismaService) {
        this.pipelineRepository = pipelineRepository;
        this.prismaService = prismaService;
    }
    async create(createPipelineDto) {
        const { userIds } = createPipelineDto;
        const users = await this.prismaService.user.findMany({
            where: {
                id: { in: userIds },
            },
        });
        if (users.length !== userIds.length) {
            throw new common_1.HttpException('Um ou mais IDs de usuário fornecidos não existem.', 400);
        }
        return await this.pipelineRepository.create(createPipelineDto);
    }
    async findAll(userId) {
        const pipelines = await this.pipelineRepository.findByUser(userId);
        if (!pipelines.length) {
            throw new common_1.HttpException('Nenhuma pipeline encontrada para este usuário.', 404);
        }
        return pipelines;
    }
    async findById(pipelineId, userId) {
        const pipeline = await this.pipelineRepository.findByIdAndUser(pipelineId, userId);
        if (!pipeline) {
            throw new common_1.HttpException('Pipeline não encontrada ou acesso não autorizado.', 404);
        }
        return pipeline;
    }
    async update(id, updatePipelineDto) {
        return await this.pipelineRepository.update(id, updatePipelineDto);
    }
    async delete(id) {
        return await this.pipelineRepository.delete(id);
    }
};
exports.PipelineService = PipelineService;
exports.PipelineService = PipelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pipeline_repository_1.PipelineRepository,
        prisma_service_1.PrismaService])
], PipelineService);
//# sourceMappingURL=pipeline.service.js.map