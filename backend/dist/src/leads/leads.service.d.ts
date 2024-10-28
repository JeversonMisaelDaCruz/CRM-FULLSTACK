import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsRepository } from './repositories/leads.repository';
export declare class LeadsService {
    private readonly leadsRepository;
    constructor(leadsRepository: LeadsRepository);
    create(createLeadDto: CreateLeadDto): Promise<import("./entities/lead.entity").LeadEntity>;
    findAll(): Promise<import("./entities/lead.entity").LeadEntity[]>;
    findById(id: string): Promise<import("./entities/lead.entity").LeadEntity>;
    findByEmail(email: string): Promise<import("./entities/lead.entity").LeadEntity>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<void>;
    remove(id: string): Promise<import("./entities/lead.entity").LeadEntity>;
}
