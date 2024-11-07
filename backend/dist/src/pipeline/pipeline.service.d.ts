import { CreatePipelineDto } from './dto/create-pipeline.dto';
import { UpdatePipelineDto } from './dto/update-pipeline.dto';
import { PipelineRepository } from './repositories/pipeline.repository';
export declare class PipelineService {
    private readonly pipelineRepository;
    constructor(pipelineRepository: PipelineRepository);
    create(createPipelineDto: CreatePipelineDto): Promise<import("./entities/pipeline.entity").PipelineEntity>;
    findAll(): Promise<import("./entities/pipeline.entity").PipelineEntity[]>;
    findById(id: string): Promise<import("./entities/pipeline.entity").PipelineEntity>;
    update(id: string, updatePipelineDto: UpdatePipelineDto): Promise<UpdatePipelineDto>;
    remove(id: string): Promise<import("./entities/pipeline.entity").PipelineEntity>;
}
