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
exports.AuthService = void 0;
const common_1 = require("@nestjs/common");
const jwt_1 = require("@nestjs/jwt");
const bcrypt = require("bcryptjs");
const prisma_service_1 = require("../prisma/prisma.service");
const user_repository_1 = require("../users/repositories/user.repository");
const jwtConstants_1 = require("./jwtConstants");
let AuthService = class AuthService {
    constructor(prisma, userRepository, jwtService, PrismaService) {
        this.prisma = prisma;
        this.userRepository = userRepository;
        this.jwtService = jwtService;
        this.PrismaService = PrismaService;
    }
    async login(email, password) {
        const user = await this.validateUser(email, password);
        if (!user) {
            throw new common_1.UnauthorizedException('Credenciais Inválidas!');
        }
        const payload = { email: user.email, id: user.id };
        const accessToken = this.jwtService.sign(payload, {
            secret: jwtConstants_1.jwtConstants.secret,
        });
        await this.prisma.token.create({
            data: {
                access_token: accessToken,
                user_id: user.id,
            },
        });
        return {
            access_token: accessToken,
        };
    }
    async getProfile(id) {
        return await this.prisma.user.findFirst({
            where: { id: id },
            select: {
                name: true,
                email: true,
                identifier: true,
            },
        });
    }
    async logout(userId) {
        await this.prisma.token.updateMany({
            where: {
                user_id: userId,
                is_revoked: false,
            },
            data: {
                is_revoked: true,
            },
        });
    }
    async validateUser(email, password) {
        const user = await this.prisma.user.findFirst({ where: { email } });
        console.log('User found:', user);
        if (user) {
            const isPasswordMatching = await bcrypt.compare(password, user.password);
            console.log('Is password matching?', isPasswordMatching);
            if (isPasswordMatching) {
                return user;
            }
        }
        return null;
    }
};
exports.AuthService = AuthService;
exports.AuthService = AuthService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [prisma_service_1.PrismaService,
        user_repository_1.UserRepository,
        jwt_1.JwtService,
        prisma_service_1.PrismaService])
], AuthService);
//# sourceMappingURL=auth.service.js.map