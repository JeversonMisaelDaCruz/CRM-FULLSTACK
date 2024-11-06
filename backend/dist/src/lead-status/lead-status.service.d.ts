import { CreateLeadStatusDto } from './dto/create-lead-status.dto';
import { StatusLeadsRepository } from './repositories/leads-status.repository';
export declare class LeadStatusService {
    private readonly statusLeadsRepository;
    constructor(statusLeadsRepository: StatusLeadsRepository);
    create(CreateLeadStatusDto: CreateLeadStatusDto): Promise<import("./entities/lead-status.entity").LeadStatusEntity>;
    findAll(): Promise<import("./entities/lead-status.entity").LeadStatusEntity[]>;
}
