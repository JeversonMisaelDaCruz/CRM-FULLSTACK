"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.EncryptIdentifierInterceptor = void 0;
const common_1 = require("@nestjs/common");
const crypto = require("crypto");
const operators_1 = require("rxjs/operators");
let EncryptIdentifierInterceptor = class EncryptIdentifierInterceptor {
    constructor() {
        this.algorithm = 'aes-256-cbc';
        this.passphrase = 'my_super_secret_key';
    }
    getKey() {
        return crypto.createHash('sha256').update(this.passphrase).digest();
    }
    encrypt(text) {
        const iv = crypto.randomBytes(16);
        const cipher = crypto.createCipheriv(this.algorithm, this.getKey(), iv);
        const encrypted = Buffer.concat([
            cipher.update(text, 'utf8'),
            cipher.final(),
        ]);
        return `${iv.toString('hex')}:${encrypted.toString('hex')}`;
    }
    intercept(context, next) {
        return next.handle().pipe((0, operators_1.map)((data) => {
            const encryptIdentifier = (obj) => {
                if (Array.isArray(obj)) {
                    return obj.map(encryptIdentifier);
                }
                if (obj !== null && typeof obj === 'object') {
                    const newObj = { ...obj };
                    if ('password' in newObj) {
                        delete newObj.password;
                    }
                    if ('identifier' in newObj && newObj.identifier) {
                        newObj.identifier = this.encrypt(newObj.identifier);
                    }
                    Object.keys(newObj).forEach((key) => {
                        if (typeof newObj[key] === 'object') {
                            newObj[key] = encryptIdentifier(newObj[key]);
                        }
                    });
                    return newObj;
                }
                return obj;
            };
            return encryptIdentifier(data);
        }));
    }
};
exports.EncryptIdentifierInterceptor = EncryptIdentifierInterceptor;
exports.EncryptIdentifierInterceptor = EncryptIdentifierInterceptor = __decorate([
    (0, common_1.Injectable)()
], EncryptIdentifierInterceptor);
//# sourceMappingURL=encrypt-identifier.interceptor.js.map