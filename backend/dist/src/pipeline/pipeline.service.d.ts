import { PipelineRepository } from './repositories/pipeline.repository';
import { PrismaService } from '../prisma/prisma.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineService {
    private readonly pipelineRepository;
    private readonly prismaService;
    constructor(pipelineRepository: PipelineRepository, prismaService: PrismaService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
    findAll(userId: string): Promise<({
        users: {
            user: {
                id: string;
                name: string;
                email: string;
            };
        }[];
        phases: {
            id: string;
            created_at: Date;
            updated_at: Date;
            name: string;
            pipeline_id: string | null;
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    })[]>;
    findById(pipelineId: string, userId: string): Promise<{
        users: {
            user: {
                id: string;
                name: string;
                email: string;
            };
        }[];
    } & {
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
    update(id: string, updatePipelineDto: UpdatePipelineDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
}
