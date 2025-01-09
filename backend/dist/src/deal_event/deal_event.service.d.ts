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
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDealEventDto: UpdateDealEventDto): string;
    remove(id: number): string;
}
