import { PrismaService } from '../prisma/prisma.service';
import { JwtService } from '@nestjs/jwt';
import { UserRepository } from '../users/repositories/user.repository';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare class AuthService {
    private readonly prisma;
    private readonly userRepository;
    private readonly jwtService;
    private readonly PrismaService;
    constructor(prisma: PrismaService, userRepository: UserRepository, jwtService: JwtService, PrismaService: PrismaService);
    login(email: string, password: string): Promise<{
        access_token: string;
    }>;
    logout(userId: string): Promise<void>;
    validateUser(email: string, password: string): Promise<any>;
    changeProfile(id: string, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        identifier: string;
        email: string;
    }>;
    getProfile(id: string): Promise<{
        name: string;
        identifier: string;
        email: string;
    }>;
}
