import { CreatePipelineDto } from '../dto/create-pipeline.dto';
import { PipelineEntity } from '../entities/pipeline.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdatePipelineDto } from '../dto/update-pipeline.dto';
export declare class PipelineRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createPipelineDto: CreatePipelineDto): Promise<PipelineEntity>;
    findAll(): Promise<PipelineEntity[]>;
    findById(id: string): Promise<PipelineEntity>;
    update(id: string, updatePipeline: UpdatePipelineDto): Promise<UpdatePipelineDto>;
    delete(id: string): Promise<PipelineEntity>;
}
