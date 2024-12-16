import { CreateDealDTO } from '../deal/dto/create-deal.dto';
import { UpdateDealDTO } from './dto/update-deal.dto';
import { DealRepository } from './repositories/deal.repository';
export declare class DealService {
    private readonly DealRepository;
    constructor(DealRepository: DealRepository);
    create(CreateDealDTO: CreateDealDTO): Promise<import("express").Response<any, Record<string, any>>>;
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
    findById(id: string): Promise<import("express").Response<any, Record<string, any>>>;
    update(id: string, UpdateDealDTO: UpdateDealDTO): Promise<{
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
