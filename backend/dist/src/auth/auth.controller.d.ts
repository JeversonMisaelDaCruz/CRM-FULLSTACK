import { AuthService } from './auth.service';
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
    logout(req: any): Promise<void>;
}
