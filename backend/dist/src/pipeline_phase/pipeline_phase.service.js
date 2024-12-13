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
exports.PipelinePhaseService = void 0;
const common_1 = require("@nestjs/common");
const phase_repository_1 = require("./repositories/phase.repository");
let PipelinePhaseService = class PipelinePhaseService {
    constructor(phaseRepository) {
        this.phaseRepository = phaseRepository;
    }
    async create(createPipelinePhaseDto) {
        const response = this.phaseRepository.create(createPipelinePhaseDto);
        if (!response) {
            throw new common_1.HttpException('pipelinePhase not created', 400);
        }
        console.log('pipelinePhase service criado:', response);
        return response;
    }
    async findAll() {
        return this.phaseRepository.findAll();
    }
    async findOne(id) {
        const response = this.phaseRepository.findById(id);
        if (!response) {
            throw new common_1.HttpException('pipelinePhase not found', 404);
        }
    }
    async update(id, updatePipelinePhaseDto) {
        const response = this.phaseRepository.update(id, updatePipelinePhaseDto);
        if (!response) {
            throw new common_1.HttpException('pipelinePhase not updated', 400);
        }
        console.log('pipelinePhase service atualizado:', response);
        return response;
    }
    async remove(id) {
        const response = this.phaseRepository.remove(id);
        if (!response) {
            throw new common_1.HttpException('pipelinePhase not deleted', 400);
        }
        console.log('pipelinePhase service deletado:', response);
        return response;
    }
};
exports.PipelinePhaseService = PipelinePhaseService;
exports.PipelinePhaseService = PipelinePhaseService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [phase_repository_1.PhaseRepository])
], PipelinePhaseService);
//# sourceMappingURL=pipeline_phase.service.js.map