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
exports.UpdateUserDto = void 0;
const class_validator_1 = require("class-validator");
class UpdateUserDto {
}
exports.UpdateUserDto = UpdateUserDto;
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(11, {
        message: 'O Cpf deve ter pelo menos 11 caracteres. Por favor, tente novamente.',
    }),
    (0, class_validator_1.MaxLength)(11, {
        message: 'O Cpf deve ter no maximo 11 aracteres. Por favor, tente novamente.',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "identifier", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(90, {
        message: 'O e-mail deve ter o maximo de 120 caracteres. Por favor, tente novamente.',
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'A senha deve ter pelo menos 6 caracteres. Por favor, tente novamente.',
    }),
    (0, class_validator_1.IsEmail)({}, {
        message: 'E-mail inválido. Por favor, forneça um endereço de e-mail válido.',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsOptional)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MaxLength)(130, {
        message: 'A senha deve ter no maximo 130 caracteres. Por favor, tente novamente.',
    }),
    (0, class_validator_1.MinLength)(6, {
        message: 'A senha deve ter pelo menos 6 caracteres. Por favor, tente novamente.',
    }),
    __metadata("design:type", String)
], UpdateUserDto.prototype, "password", void 0);
//# sourceMappingURL=update-user.dto.js.map