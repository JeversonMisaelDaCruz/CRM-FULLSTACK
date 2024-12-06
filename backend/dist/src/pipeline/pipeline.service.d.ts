import { PipelineRepository } from './repositories/pipeline.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineService {
    private readonly pipelineRepository;
    private readonly prismaService;
    constructor(pipelineRepository: PipelineRepository, prismaService: PrismaService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(userId: string): Promise<({
        users: {
            user: {
                name: string;
                email: string;
                id: string;
            };
        }[];
    } & {
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    })[]>;
    findById(pipelineId: string, userId: string): Promise<{
        users: {
            user: {
                name: string;
                email: string;
                id: string;
            };
        }[];
    } & {
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updatePipelineDto: UpdatePipelineDto): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
