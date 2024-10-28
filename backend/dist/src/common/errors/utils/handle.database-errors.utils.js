"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.handleDatabaseErrors = void 0;
const databaseError_1 = require("../types/databaseError");
const uniqueConstraintError_1 = require("../types/uniqueConstraintError");
var PrismaErrors;
(function (PrismaErrors) {
    PrismaErrors["UniqueConstraintFail"] = "P2002";
})(PrismaErrors || (PrismaErrors = {}));
const handleDatabaseErrors = (e) => {
    switch (e.code) {
        case PrismaErrors.UniqueConstraintFail:
            return new uniqueConstraintError_1.UniqueConstraintError(e);
        default:
            return new databaseError_1.DatabaseError(e.message);
    }
};
exports.handleDatabaseErrors = handleDatabaseErrors;
//# sourceMappingURL=handle.database-errors.utils.js.map