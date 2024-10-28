"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.PrismaService = void 0;
const common_1 = require("@nestjs/common");
const client_1 = require("@prisma/client");
client_1.Prisma.Decimal.prototype.toJSON = function () {
    return this.toNumber();
};
let PrismaService = class PrismaService extends client_1.PrismaClient {
    constructor() {
        super(...arguments);
        this.dateTimeMiddleware = async (params, next) => {
            const result = await next(params);
            const formatDateTime = (obj) => {
                for (const key in obj) {
                    if (obj[key] instanceof Date) {
                        obj[key] = obj[key].toISOString();
                    }
                    else if (typeof obj[key] === 'object' && obj[key] !== null) {
                        formatDateTime(obj[key]);
                    }
                }
            };
            if (Array.isArray(result)) {
                result.forEach((item) => formatDateTime(item));
            }
            else if (typeof result === 'object' && result !== null) {
                formatDateTime(result);
            }
            return result;
        };
    }
    async onModuleInit() {
        await this.$connect();
        this.$use(this.dateTimeMiddleware);
    }
    async enableShutdownHooks(app) {
        process.on('beforeExit', async () => {
            await app.close();
        });
    }
};
exports.PrismaService = PrismaService;
exports.PrismaService = PrismaService = __decorate([
    (0, common_1.Injectable)()
], PrismaService);
//# sourceMappingURL=prisma.service.js.map