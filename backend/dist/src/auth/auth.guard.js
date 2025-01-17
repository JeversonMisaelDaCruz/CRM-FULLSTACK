"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AuthGuard = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const jwtConstants_1 = require("./jwtConstants");
const prisma_service_1 = require("../prisma/prisma.service");
let AuthGuard = class AuthGuard {
    constructor(jwtService, prisma) {
        this.jwtService = jwtService;
        this.prisma = prisma;
    }
    async canActivate(context) {
        const request = context.switchToHttp().getRequest();
        const token = this.extractTokenFromHeader(request);
        if (!token) {
            throw new common_1.UnauthorizedException('Token não encontrado');
        }
        try {
            const payload = await this.jwtService.verifyAsync(token, {
                secret: jwtConstants_1.jwtConstants.secret,
            });
            const tokenInDb = await this.prisma.token.findFirst({
                where: {
                    access_token: token,
                },
            });
            if (!tokenInDb || tokenInDb.is_revoked) {
                throw new common_1.UnauthorizedException('Token Revogado!');
            }
            request.user = payload;
            return true;
        }
        catch {
            throw new common_1.UnauthorizedException('Token Inválido!');
        }
    }
    extractTokenFromHeader(request) {
        const authorizationHeader = request.headers.authorization;
        if (authorizationHeader && typeof authorizationHeader === 'string') {
            const [type, token] = authorizationHeader.split(' ');
            if (type === 'Bearer' && token) {
                return token;
            }
        }
        return undefined;
    }
};
exports.AuthGuard = AuthGuard;
exports.AuthGuard = AuthGuard = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthGuard);
//# sourceMappingURL=auth.guard.js.map