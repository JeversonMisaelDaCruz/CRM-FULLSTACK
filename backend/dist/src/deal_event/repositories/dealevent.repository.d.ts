import { PrismaService } from '../../prisma/prisma.service';
import { CreateDealEventDto } from '../dto/create-deal_event.dto';
import { UpdateDealEventDto } from '../dto/update-deal_event.dto';
export declare class DealEventRepository {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    create(CreateDealEventDto: CreateDealEventDto): Promise<{
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
    update(id: string, UpdateDealEventDto: UpdateDealEventDto): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
    findById(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
    delete(id: string): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        message: string;
        date: Date;
        done: boolean;
        deal_id: string | null;
        user_id: string | null;
    }>;
}
