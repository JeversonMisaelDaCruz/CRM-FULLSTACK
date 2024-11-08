import { PrismaService } from '../../prisma/prisma.service';
import { CreatePipelinePhaseDto } from '../dto/create-pipeline_phase.dto';
import { UpdatePipelinePhaseDto } from '../dto/update-pipeline_phase.dto';
import { PipelinePhaseEntity } from '../entities/pipeline_phase.entity';
export declare class PhaseRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPipelinePhaseDto: CreatePipelinePhaseDto): Promise<PipelinePhaseEntity>;
    findAll(): Promise<PipelinePhaseEntity[]>;
    findById(id: string): Promise<PipelinePhaseEntity>;
    update(id: string, UpdatePipelinePhaseDto: UpdatePipelinePhaseDto): Promise<PipelinePhaseEntity>;
    remove(id: string): Promise<PipelinePhaseEntity>;
}
