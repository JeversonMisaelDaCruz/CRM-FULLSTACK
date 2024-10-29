import { AuthService } from './auth.service';
import { UpdateUserDto } from 'src/users/dto/update-user.dto';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
    }>;
    getProfile(req: any): Promise<{
        name: string;
        identifier: string;
        email: string;
    }>;
    changeProfile(req: any, updateUserDto: UpdateUserDto): Promise<{
        name: string;
        identifier: string;
        email: string;
    }>;
    logout(req: any): Promise<void>;
}
