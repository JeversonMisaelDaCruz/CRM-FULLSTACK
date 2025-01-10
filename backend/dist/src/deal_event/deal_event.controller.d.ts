import { DealEventService } from './deal_event.service';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
export declare class DealEventController {
    private readonly dealEventService;
    constructor(dealEventService: DealEventService);
    create(createDealEventDto: CreateDealEventDto): Promise<void>;
    findAll(): Promise<void>;
    findById(id: string): Promise<void>;
    update(id: string, updateDealEventDto: UpdateDealEventDto): Promise<void>;
    remove(id: string): Promise<void>;
}
