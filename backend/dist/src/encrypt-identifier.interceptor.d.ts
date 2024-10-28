import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
export declare class EncryptIdentifierInterceptor implements NestInterceptor {
    private readonly algorithm;
    private readonly passphrase;
    private getKey;
    private encrypt;
    intercept(context: ExecutionContext, next: CallHandler): Observable<any>;
}
