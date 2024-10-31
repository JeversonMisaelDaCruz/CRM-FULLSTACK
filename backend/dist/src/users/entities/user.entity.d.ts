import { User } from '@prisma/client';
export declare class UserEntity implements User {
    name: string;
    id: string;
    identifier: string;
    email: string;
    password: string;
    created_at: Date;
    updated_at: Date;
}