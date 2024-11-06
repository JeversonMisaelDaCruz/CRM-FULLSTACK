import { PrismaService } from 'src/prisma/prisma.service';
import { CreateLeadStatusDto } from '../dto/create-lead-status.dto';
import { LeadStatusEntity } from '../entities/lead-status.entity';
export declare class StatusLeadsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(CreateLeadStatusDto: CreateLeadStatusDto): Promise<LeadStatusEntity>;
    findAll(): Promise<LeadStatusEntity[]>;
}
