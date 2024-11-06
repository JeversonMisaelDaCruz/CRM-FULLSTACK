import { CreateLeadStatusDto } from './dto/create-lead-status.dto';
import { LeadStatusService } from './lead-status.service';
export declare class LeadStatusController {
    private readonly leadStatusService;
    constructor(leadStatusService: LeadStatusService);
    create(createLeadStatusDto: CreateLeadStatusDto): Promise<import("./entities/lead-status.entity").LeadStatusEntity>;
    findAll(): Promise<import("./entities/lead-status.entity").LeadStatusEntity[]>;
}
