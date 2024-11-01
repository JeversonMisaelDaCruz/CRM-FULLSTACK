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
exports.LeadStatusController = void 0;
const common_1 = require("@nestjs/common");
const lead_status_service_1 = require("./lead-status.service");
let LeadStatusController = class LeadStatusController {
    constructor(leadStatusService) {
        this.leadStatusService = leadStatusService;
    }
    async findAll() {
        return this.leadStatusService.findAll();
    }
};
exports.LeadStatusController = LeadStatusController;
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", Promise)
], LeadStatusController.prototype, "findAll", null);
exports.LeadStatusController = LeadStatusController = __decorate([
    (0, common_1.Controller)('lead-status'),
    __metadata("design:paramtypes", [lead_status_service_1.LeadStatusService])
], LeadStatusController);
//# sourceMappingURL=lead-status.controller.js.map