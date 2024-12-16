import { DealService } from './deal.service';
import { CreateDealDTO } from './dto/create-deal.dto';
import { UpdateDealDTO } from './dto/update-deal.dto';
export declare class DealController {
    private readonly dealService;
    constructor(dealService: DealService);
    create(createDealDto: CreateDealDTO): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.DealStatus;
        archived: boolean;
        due_date: Date | null;
        user_id: string | null;
        pipeline_phase_id: string | null;
        lead_id: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.DealStatus;
        archived: boolean;
        due_date: Date | null;
        user_id: string | null;
        pipeline_phase_id: string | null;
        lead_id: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.DealStatus;
        archived: boolean;
        due_date: Date | null;
        user_id: string | null;
        pipeline_phase_id: string | null;
        lead_id: string | null;
    }>;
    update(id: string, updateDealDto: UpdateDealDTO): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.DealStatus;
        archived: boolean;
        due_date: Date | null;
        user_id: string | null;
        pipeline_phase_id: string | null;
        lead_id: string | null;
    }>;
    remove(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        title: string;
        description: string;
        status: import(".prisma/client").$Enums.DealStatus;
        archived: boolean;
        due_date: Date | null;
        user_id: string | null;
        pipeline_phase_id: string | null;
        lead_id: string | null;
    }>;
}
