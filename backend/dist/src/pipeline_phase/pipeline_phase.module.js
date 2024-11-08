"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelinePhaseModule = void 0;
const common_1 = require("@nestjs/common");
const pipeline_phase_service_1 = require("./pipeline_phase.service");
const pipeline_phase_controller_1 = require("./pipeline_phase.controller");
const phase_repository_1 = require("./repositories/phase.repository");
const prisma_service_1 = require("../prisma/prisma.service");
let PipelinePhaseModule = class PipelinePhaseModule {
};
exports.PipelinePhaseModule = PipelinePhaseModule;
exports.PipelinePhaseModule = PipelinePhaseModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [pipeline_phase_controller_1.PipelinePhaseController],
        providers: [pipeline_phase_service_1.PipelinePhaseService, prisma_service_1.PrismaService, phase_repository_1.PhaseRepository],
        exports: [phase_repository_1.PhaseRepository],
    })
], PipelinePhaseModule);
//# sourceMappingURL=pipeline_phase.module.js.map