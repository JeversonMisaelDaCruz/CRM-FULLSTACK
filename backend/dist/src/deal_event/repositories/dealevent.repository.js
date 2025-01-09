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
exports.DealEventRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let DealEventRepository = class DealEventRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(CreateDealEventDto) {
        try {
            const createEvent = await this.prismaService.dealEvent.create({
                data: CreateDealEventDto,
            });
            console.log('response in repository:', createEvent);
            return createEvent;
        }
        catch (error) {
            console.error('Error creating deal event: in repository', error);
            throw error;
        }
    }
    async findAll() {
        try {
            const findAllEvent = await this.prismaService.dealEvent.findMany();
            console.log('findAllEvent:', findAllEvent);
            return findAllEvent;
        }
        catch (error) {
            console.error('Error finding all deal events: in repository', error);
            throw error;
        }
    }
    async update(id, UpdateDealEventDto) {
        try {
            const updateEvent = await this.prismaService.dealEvent.update({
                where: { id },
                data: UpdateDealEventDto,
            });
            return updateEvent;
        }
        catch (error) {
            console.error('Error updating deal event: in repository', error);
            throw error;
        }
    }
    async findById(id) {
        try {
            const response = await this.prismaService.dealEvent.findUnique({
                where: { id },
            });
            return response;
        }
        catch (error) {
            console.error('Error finding deal event by id: in repository', error);
            throw error;
        }
    }
    async delete() { }
};
exports.DealEventRepository = DealEventRepository;
exports.DealEventRepository = DealEventRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], DealEventRepository);
//# sourceMappingURL=dealevent.repository.js.map