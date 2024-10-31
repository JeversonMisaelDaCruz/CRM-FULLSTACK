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
exports.LeadsService = void 0;
const common_1 = require("@nestjs/common");
const leads_repository_1 = require("./repositories/leads.repository");
let LeadsService = class LeadsService {
    constructor(leadsRepository) {
        this.leadsRepository = leadsRepository;
    }
    async create(createLeadDto) {
        const leadData = { ...createLeadDto };
        console.log('leadData:', leadData);
        return await this.leadsRepository.create(leadData);
    }
    async findAll() {
        return await this.leadsRepository.findAll();
    }
    async findById(id) {
        const response = await this.leadsRepository.findById(id);
        if (!response) {
            throw new common_1.NotFoundException(`${id} nao encontrado`);
        }
        return response;
    }
    async findByEmail(email) {
        return await this.leadsRepository.findByEmail(email);
    }
    async update(id, updateLeadDto) {
        const response = await this.leadsRepository.update(id, updateLeadDto);
        if (!response) {
            throw new common_1.NotFoundException(`${id} nao encontrado`);
        }
    }
    async remove(id) {
        return await this.leadsRepository.remove(id);
    }
};
exports.LeadsService = LeadsService;
exports.LeadsService = LeadsService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [leads_repository_1.LeadsRepository])
], LeadsService);
//# sourceMappingURL=leads.service.js.map