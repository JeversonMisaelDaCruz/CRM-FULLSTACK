"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseInterception = void 0;
const common_1 = require("@nestjs/common");
const operators_1 = require("rxjs/operators");
const databaseError_1 = require("../types/databaseError");
const handle_database_errors_utils_1 = require("../utils/handle.database-errors.utils");
const is_prisma_error_1 = require("../utils/is-prisma-error");
let DatabaseInterception = class DatabaseInterception {
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.catchError)((error) => {
            if ((0, is_prisma_error_1.isPrismaError)(error)) {
                error = (0, handle_database_errors_utils_1.handleDatabaseErrors)(error);
            }
            if (error instanceof databaseError_1.DatabaseError) {
                throw new common_1.BadRequestException(error.message);
            }
            else {
                throw error;
            }
        }));
    }
};
exports.DatabaseInterception = DatabaseInterception;
exports.DatabaseInterception = DatabaseInterception = __decorate([
    (0, common_1.Injectable)()
], DatabaseInterception);
//# sourceMappingURL=database.interceptors.js.map