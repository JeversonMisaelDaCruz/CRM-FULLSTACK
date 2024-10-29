import { JwtService } from '@nestjs/jwt';
import { PrismaService } from '../prisma/prisma.service';
import { UserRepository } from '../users/repositories/user.repository';
export declare class AuthService {
    private readonly prisma;
    private readonly userRepository;
    private readonly jwtService;
    private readonly PrismaService;
    constructor(prisma: PrismaService, userRepository: UserRepository, jwtService: JwtService, PrismaService: PrismaService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    getProfile(id: string): Promise<{
        name: string;
        identifier: string;
        email: string;
    }>;
    logout(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<any>;
}
