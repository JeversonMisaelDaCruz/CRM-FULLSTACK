import { DealEventService } from './deal_event.service';
import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
export declare class DealEventController {
    private readonly dealEventService;
    constructor(dealEventService: DealEventService);
    create(createDealEventDto: CreateDealEventDto): string;
    findAll(): string;
    findOne(id: string): string;
    update(id: string, updateDealEventDto: UpdateDealEventDto): string;
    remove(id: string): string;
}
