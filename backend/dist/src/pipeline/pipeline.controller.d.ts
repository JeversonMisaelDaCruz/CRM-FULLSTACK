import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineController {
    private readonly pipelineService;
    constructor(pipelineService: PipelineService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    remove(id: string): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
