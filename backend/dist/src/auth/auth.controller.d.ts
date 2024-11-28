import { AuthService } from './auth.service';
export declare class AuthController {
    private readonly authService;
    constructor(authService: AuthService);
    login(body: any): Promise<{
        access_token: string;
        user: {
            id: any;
            name: any;
            email: any;
        };
    }>;
    getProfile(req: any): Promise<{
        id: string;
        created_at: Date;
        updated_at: Date;
        name: string;
        identifier: string;
        email: string;
    }>;
    logout(req: any): Promise<void>;
}
