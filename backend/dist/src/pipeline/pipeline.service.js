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
let PipelineService = class PipelineService {
    constructor(pipelineRepository) {
        this.pipelineRepository = pipelineRepository;
    }
    async create(createPipelineDto) {
        const response = await this.pipelineRepository.create(createPipelineDto);
        if (!response) {
            throw new common_1.HttpException('pipeline not created', 400);
        }
        console.log('pipeline criado:', response);
        return response;
    }
    async findAll() {
        const response = await this.pipelineRepository.findAll();
        if (!response) {
            throw new common_1.HttpException('pipeline not created', 400);
        }
        console.log('pipeline encontrados:', response);
        return response;
    }
    async findById(id) {
        const response = await this.pipelineRepository.findById(id);
        if (!response) {
            throw new common_1.HttpException('pipeline not created', 400);
        }
        console.log('pipeline encontrado:', response);
        return response;
    }
    async update(id, updatePipelineDto) {
        const response = await this.pipelineRepository.update(id, updatePipelineDto);
        if (!response) {
            throw new common_1.HttpException('pipeline not found', 404);
        }
        console.log('pipeline atualizado:', response);
        return response;
    }
    async remove(id) {
        const response = await this.pipelineRepository.delete(id);
        if (!response) {
            throw new common_1.HttpException('pipeline not created', 400);
        }
        console.log('pipeline deletado:', response);
        return response;
    }
};
exports.PipelineService = PipelineService;
exports.PipelineService = PipelineService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [pipeline_repository_1.PipelineRepository])
], PipelineService);
//# sourceMappingURL=pipeline.service.js.map