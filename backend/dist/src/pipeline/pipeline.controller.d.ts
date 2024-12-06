import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineController {
    private readonly pipelineService;
    constructor(pipelineService: PipelineService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
    findAll(req: any): Promise<({
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
    findOne(id: string, req: any): Promise<{
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
    remove(id: string): Promise<{
        name: string;
        id: string;
        created_at: Date;
        updated_at: Date;
    }>;
}
