import { LeadStatusService } from './lead-status.service';
export declare class LeadStatusController {
    private readonly leadStatusService;
    constructor(leadStatusService: LeadStatusService);
    findAll(): Promise<{
        id: string;
        name: string;
        created_at: Date;
        updated_at: Date;
    }[]>;
}
