import { ConflictError } from './conflictError';
import { PrismaClientError } from './prismaClientError';
export declare class UniqueConstraintError extends ConflictError {
    constructor(e: PrismaClientError);
}
