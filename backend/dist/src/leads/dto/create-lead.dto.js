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
exports.CreateLeadDto = void 0;
const class_validator_1 = require("class-validator");
class CreateLeadDto {
}
exports.CreateLeadDto = CreateLeadDto;
__decorate([
    (0, class_validator_1.IsNotEmpty)(),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, {
        message: 'O nome deve ter pelo menos 2 caracteres',
    }),
    (0, class_validator_1.MaxLength)(100),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "name", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'O e-mail deve ser informado',
    }),
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
], CreateLeadDto.prototype, "email", void 0);
__decorate([
    (0, class_validator_1.IsNotEmpty)({
        message: 'o Telefone deve ser informado',
    }),
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.MinLength)(2, {
        message: 'O Telefone deve ter pelo menos 2 caracteres. Por favor, tente novamente.',
    }),
    (0, class_validator_1.MaxLength)(17, {
        message: 'O Telefone deve ter no maximo 17 aracteres. Por favor, tente novamente.',
    }),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "phone", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "user_id", void 0);
__decorate([
    (0, class_validator_1.IsString)(),
    (0, class_validator_1.IsOptional)(),
    __metadata("design:type", String)
], CreateLeadDto.prototype, "leads_status_id", void 0);
//# sourceMappingURL=create-lead.dto.js.map