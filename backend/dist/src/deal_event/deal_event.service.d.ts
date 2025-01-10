import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
import { DealEventRepository } from './repositories/dealevent.repository';
export declare class DealEventService {
    private readonly dealEventRepository;
    constructor(dealEventRepository: DealEventRepository);
    create(createDealEventDto: CreateDealEventDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
    findAll(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }[]>;
    findOne(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
    update(id: string, updateDealEventDto: UpdateDealEventDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
    remove(id: string): Promise<{
        message: string;
    }>;
}
