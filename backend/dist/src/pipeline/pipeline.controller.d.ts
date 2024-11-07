import { PipelineService } from './pipeline.service';
import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
export declare class PipelineController {
    private readonly pipelineService;
    constructor(pipelineService: PipelineService);
    create(createPipelineDto: CreatePipelineDto): Promise<import("./entities/pipeline.entity").PipelineEntity>;
    findAll(): Promise<import("./entities/pipeline.entity").PipelineEntity[]>;
    findOne(id: string): Promise<import("./entities/pipeline.entity").PipelineEntity>;
    update(id: string, updatePipelineDto: UpdatePipelineDto): Promise<UpdatePipelineDto>;
    remove(id: string): Promise<import("./entities/pipeline.entity").PipelineEntity>;
}
