"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.UniqueConstraintError = void 0;
const conflictError_1 = require("./conflictError");
class UniqueConstraintError extends conflictError_1.ConflictError {
    constructor(e) {
        const uniqueField = e.meta.target;
        super(`A record with this ${uniqueField} already exists`);
    }
}
exports.UniqueConstraintError = UniqueConstraintError;
//# sourceMappingURL=uniqueConstraintError.js.map