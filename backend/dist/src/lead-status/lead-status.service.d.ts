import { PrismaService } from '../prisma/prisma.service';
export declare class LeadStatusService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
    }[]>;
}
