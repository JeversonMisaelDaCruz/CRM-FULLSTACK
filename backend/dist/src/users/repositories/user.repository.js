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
exports.UserRepository = void 0;
const prisma_service_1 = require("../../prisma/prisma.service");
const common_1 = require("@nestjs/common");
let UserRepository = class UserRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createUserDto) {
        if (createUserDto.email && (await this.findByEmail(createUserDto.email))) {
            throw new common_1.HttpException('email ja existe ', 401);
        }
        if (createUserDto.identifier &&
            (await this.findByIdentifier(createUserDto.identifier))) {
            throw new common_1.HttpException('identifer ja existe', 401);
        }
        return await this.prismaService.user.create({ data: createUserDto });
    }
    async findAll() {
        return await this.prismaService.user.findMany();
    }
    async findById(id) {
        return await this.prismaService.user.findFirst({
            where: { id },
        });
    }
    async findByEmail(email) {
        return this.prismaService.user.findUnique({
            where: { email },
        });
    }
    async findByIdentifier(identifier) {
        return this.prismaService.user.findUnique({
            where: { identifier },
        });
    }
    async update(id, updateUserDto) {
        if (updateUserDto.email && (await this.findByEmail(updateUserDto.email))) {
            throw new common_1.HttpException('Email já existe', 401);
        }
        if (updateUserDto.identifier &&
            (await this.findByIdentifier(updateUserDto.identifier))) {
            throw new common_1.HttpException('Identifier já existe', 401);
        }
        if (updateUserDto) {
            throw new common_1.HttpException('não permitido campo vazio', 400);
        }
        return await this.prismaService.user.update({
            where: { id },
            data: updateUserDto,
        });
    }
    async remove(id) {
        const response = await this.prismaService.user.delete({ where: { id } });
        if (!response) {
            throw new common_1.HttpException('user not found', 404);
        }
        return response;
    }
};
exports.UserRepository = UserRepository;
exports.UserRepository = UserRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], UserRepository);
//# sourceMappingURL=user.repository.js.map