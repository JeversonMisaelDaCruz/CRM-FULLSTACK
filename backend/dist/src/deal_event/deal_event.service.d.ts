import { CreateDealEventDto } from './dto/create-deal_event.dto';
import { UpdateDealEventDto } from './dto/update-deal_event.dto';
export declare class DealEventService {
    create(createDealEventDto: CreateDealEventDto): string;
    findAll(): string;
    findOne(id: number): string;
    update(id: number, updateDealEventDto: UpdateDealEventDto): string;
    remove(id: number): string;
}
