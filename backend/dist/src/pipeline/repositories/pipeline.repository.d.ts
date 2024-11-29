import { PrismaService } from '../../prisma/prisma.service';
import { CreatePipelineDto } from '../dto/create-pipeline.dto';
import { UpdatePipelineDto } from '../dto/update-pipeline.dto';
export declare class PipelineRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findById(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findByUser(userId: string): Promise<({
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
    findByIdAndUser(pipelineId: string, userId: string): Promise<{
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
