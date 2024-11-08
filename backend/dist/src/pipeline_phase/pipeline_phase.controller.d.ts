import { PipelinePhaseService } from './pipeline_phase.service';
import { CreatePipelinePhaseDto } from './dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from './dto/update-pipeline_phase.dto';
export declare class PipelinePhaseController {
    private readonly pipelinePhaseService;
    constructor(pipelinePhaseService: PipelinePhaseService);
    create(createPipelinePhaseDto: CreatePipelinePhaseDto): Promise<import("./entities/pipeline_phase.entity").PipelinePhaseEntity>;
    findAll(): Promise<import("./entities/pipeline_phase.entity").PipelinePhaseEntity[]>;
    findOne(id: string): Promise<void>;
    update(id: string, updatePipelinePhaseDto: UpdatePipelinePhaseDto): Promise<import("./entities/pipeline_phase.entity").PipelinePhaseEntity>;
    remove(id: string): Promise<import("./entities/pipeline_phase.entity").PipelinePhaseEntity>;
}
