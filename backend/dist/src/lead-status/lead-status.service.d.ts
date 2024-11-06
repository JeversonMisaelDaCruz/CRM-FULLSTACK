import { PrismaService } from '../prisma/prisma.service';
export declare class LeadStatusService {
    private readonly prismaService;
    constructor(prismaService: PrismaService);
    findAll(): Promise<{
        id: string;
        name: string;
    }[]>;
}
