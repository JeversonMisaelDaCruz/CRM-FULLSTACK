import { PrismaService } from '../../prisma/prisma.service';
import { CreateLeadDto } from '../dto/create-lead.dto';
import { UpdateLeadDto } from '../dto/update-lead.dto';
import { LeadEntity } from '../entities/lead.entity';
export declare class LeadsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createLeadDto: CreateLeadDto): Promise<LeadEntity>;
    findAll(): Promise<LeadEntity[]>;
    findById(id: string): Promise<LeadEntity>;
    update(id: string, updateLead: UpdateLeadDto): Promise<LeadEntity>;
    findByEmail(email: string): Promise<LeadEntity>;
    remove(id: string): Promise<LeadEntity>;
}
