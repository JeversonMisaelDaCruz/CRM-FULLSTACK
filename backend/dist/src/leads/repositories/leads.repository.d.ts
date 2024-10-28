import { CreateLeadDto } from '../dto/create-lead.dto';
import { LeadEntity } from '../entities/lead.entity';
import { PrismaService } from '../../prisma/prisma.service';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
export declare class LeadsRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(createLeadDto: CreateLeadDto): Promise<LeadEntity>;
    findAll(): Promise<LeadEntity[]>;
    findById(id: string): Promise<LeadEntity>;
    update(id: string, updateUserDto: UpdateUserDto): Promise<LeadEntity>;
    findByEmail(email: string): Promise<LeadEntity>;
    remove(id: string): Promise<LeadEntity>;
}
