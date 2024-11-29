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
exports.PipelineRepository = void 0;
const common_1 = require("@nestjs/common");
const prisma_service_1 = require("../../prisma/prisma.service");
let PipelineRepository = class PipelineRepository {
    constructor(prismaService) {
        this.prismaService = prismaService;
    }
    async create(createPipelineDto) {
        const { name, userIds } = createPipelineDto;
        const pipeline = await this.prismaService.pipeline.create({
            data: { name },
        });
        const associationsIdWithPipeline = userIds.map((userId) => ({
            pipeline_id: pipeline.id,
            user_id: userId,
        }));
        await this.prismaService.pipeline_User.createMany({
            data: associationsIdWithPipeline,
        });
        return pipeline;
    }
    async findById(id) {
        return await this.prismaService.pipeline.findUnique({
            where: { id },
        });
    }
    async findByUser(userId) {
        return await this.prismaService.pipeline.findMany({
            where: {
                users: {
                    some: { user_id: userId },
                },
            },
            include: {
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async findByIdAndUser(pipelineId, userId) {
        return await this.prismaService.pipeline.findFirst({
            where: {
                id: pipelineId,
                users: {
                    some: { user_id: userId },
                },
            },
            include: {
                users: {
                    select: {
                        user: {
                            select: {
                                id: true,
                                name: true,
                                email: true,
                            },
                        },
                    },
                },
            },
        });
    }
    async update(id, updatePipelineDto) {
        return await this.prismaService.pipeline.update({
            where: { id },
            data: updatePipelineDto,
        });
    }
    async delete(id) {
        return await this.prismaService.pipeline.delete({
            where: { id },
        });
    }
};
exports.PipelineRepository = PipelineRepository;
exports.PipelineRepository = PipelineRepository = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService])
], PipelineRepository);
//# sourceMappingURL=pipeline.repository.js.map