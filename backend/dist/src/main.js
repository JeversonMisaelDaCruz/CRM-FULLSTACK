"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const common_1 = require("@nestjs/common");
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const conflict_interceptors_1 = require("./common/errors/interceptors/conflict.interceptors");
const database_interceptors_1 = require("./common/errors/interceptors/database.interceptors");
const notFound_interceptors_1 = require("./common/errors/interceptors/notFound.interceptors");
const unauthorized_interceptor_1 = require("./common/errors/interceptors/unauthorized.interceptor");
const encrypt_identifier_interceptor_1 = require("./encrypt-identifier.interceptor");
async function bootstrap() {
    const app = await core_1.NestFactory.create(app_module_1.AppModule, { cors: true });
    app.useGlobalPipes(new common_1.ValidationPipe({
        whitelist: true,
        forbidNonWhitelisted: true,
        transform: true,
    }));
    app.useGlobalInterceptors(new conflict_interceptors_1.ConflictInterception());
    app.useGlobalInterceptors(new database_interceptors_1.DatabaseInterception());
    app.useGlobalInterceptors(new unauthorized_interceptor_1.UnauthorizedInterception());
    app.useGlobalInterceptors(new notFound_interceptors_1.NotFoundInterception());
    app.useGlobalInterceptors(new encrypt_identifier_interceptor_1.EncryptIdentifierInterceptor());
    const port = process.env.PORT || 3001;
    await app.listen(port);
    return app;
}
bootstrap();
//# sourceMappingURL=main.js.map