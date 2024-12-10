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
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(userId: string): Promise<({
        phases: {
            id: string;
            name: string;
            created_at: Date;
            updated_at: Date;
            pipeline_id: string | null;
        }[];
        users: {
            user: {
                id: string;
                name: string;
                email: string;
            };
        }[];
    } & {
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
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
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    update(id: string, updatePipelineDto: UpdatePipelineDto): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    delete(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
