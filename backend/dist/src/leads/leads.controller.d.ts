import { CreateLeadDto } from './dto/create-lead.dto';
import { UpdateLeadDto } from './dto/update-lead.dto';
import { LeadsService } from './leads.service';
export declare class LeadsController {
    private readonly leadsService;
    constructor(leadsService: LeadsService);
    create(createLeadDto: CreateLeadDto): Promise<import("./entities/lead.entity").LeadEntity>;
    findAll(): Promise<import("./entities/lead.entity").LeadEntity[]>;
    findOne(id: string): Promise<import("./entities/lead.entity").LeadEntity>;
    update(id: string, updateLeadDto: UpdateLeadDto): Promise<void>;
    remove(id: string): Promise<import("./entities/lead.entity").LeadEntity>;
}
