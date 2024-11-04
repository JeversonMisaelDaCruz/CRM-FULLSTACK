import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/repositories/user.repository';
export declare class AuthService {
    private readonly prisma;
    private readonly userRepository;
    private readonly jwtService;
    constructor(prisma: PrismaService, userRepository: UserRepository, jwtService: JwtService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getProfile(id: string): Promise<{
        created_at: Date;
        updated_at: Date;
        name: string;
        identifier: string;
        email: string;
    }>;
    logout(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<any>;
}
