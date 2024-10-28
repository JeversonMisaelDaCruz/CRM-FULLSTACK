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
exports.LeadsRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let LeadsRepository = class LeadsRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createLeadDto) {
        return await this.prismaService.lead.create({ data: createLeadDto });
    }
    async findAll() {
        return await this.prismaService.lead.findMany();
    }
    async findById(id) {
        return await this.prismaService.lead.findUnique({
            where: { id },
        });
    }
    async update(id, updateUserDto) {
        if (updateUserDto) {
            throw new common_1.HttpException('não permitido campo vazio', 400);
        }
        return await this.prismaService.lead.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async findByEmail(email) {
        return this.prismaService.lead.findFirst({
            where: { email },
        });
    }
    async remove(id) {
        return await this.prismaService.lead.delete({
            where: { id },
        });
    }
};
exports.LeadsRepository = LeadsRepository;
exports.LeadsRepository = LeadsRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], LeadsRepository);
//# sourceMappingURL=leads.repository.js.map