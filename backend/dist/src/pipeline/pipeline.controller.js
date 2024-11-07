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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PipelineController = void 0;
const common_1 = require("@nestjs/common");
const pipeline_service_1 = require("./pipeline.service");
const create_pipeline_dto_1 = require("./dto/create-pipeline.dto");
const update_pipeline_dto_1 = require("./dto/update-pipeline.dto");
const auth_guard_1 = require("../auth/auth.guard");
let PipelineController = class PipelineController {
    constructor(pipelineService) {
        this.pipelineService = pipelineService;
    }
    create(createPipelineDto) {
        return this.pipelineService.create(createPipelineDto);
    }
    findAll() {
        return this.pipelineService.findAll();
    }
    findOne(id) {
        return this.pipelineService.findById(id);
    }
    update(id, updatePipelineDto) {
        return this.pipelineService.update(id, updatePipelineDto);
    }
    remove(id) {
        return this.pipelineService.remove(id);
    }
};
exports.PipelineController = PipelineController;
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_pipeline_dto_1.CreatePipelineDto]),
    __metadata("design:returntype", void 0)
], PipelineController.prototype, "create", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], PipelineController.prototype, "findAll", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelineController.prototype, "findOne", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_pipeline_dto_1.UpdatePipelineDto]),
    __metadata("design:returntype", void 0)
], PipelineController.prototype, "update", null);
__decorate([
    (0, common_1.UseGuards)(auth_guard_1.AuthGuard),
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], PipelineController.prototype, "remove", null);
exports.PipelineController = PipelineController = __decorate([
    (0, common_1.Controller)('pipeline'),
    __metadata("design:paramtypes", [pipeline_service_1.PipelineService])
], PipelineController);
//# sourceMappingURL=pipeline.controller.js.map