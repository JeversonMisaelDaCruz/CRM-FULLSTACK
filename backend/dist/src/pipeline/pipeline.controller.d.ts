import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineController {
    private readonly pipelineService;
    constructor(pipelineService: PipelineService);
    create(createPipelineDto: CreatePipelineDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
    findAll(req: any): Promise<({
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
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }>;
}
