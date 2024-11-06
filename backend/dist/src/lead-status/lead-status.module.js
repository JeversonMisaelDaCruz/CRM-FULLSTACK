"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.LeadStatusModule = void 0;
const common_1 = require("@nestjs/common");
const lead_status_service_1 = require("./lead-status.service");
const lead_status_controller_1 = require("./lead-status.controller");
const prisma_service_1 = require("../prisma/prisma.service");
const leads_status_repository_1 = require("./repositories/leads-status.repository");
let LeadStatusModule = class LeadStatusModule {
};
exports.LeadStatusModule = LeadStatusModule;
exports.LeadStatusModule = LeadStatusModule = __decorate([
    (0, common_1.Module)({
        imports: [],
        controllers: [lead_status_controller_1.LeadStatusController],
        providers: [lead_status_service_1.LeadStatusService, prisma_service_1.PrismaService, leads_status_repository_1.StatusLeadsRepository],
        exports: [leads_status_repository_1.StatusLeadsRepository],
    })
], LeadStatusModule);
//# sourceMappingURL=lead-status.module.js.map