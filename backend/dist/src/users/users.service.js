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
exports.UserService = void 0;
const common_1 = require("@nestjs/common");
const user_repository_1 = require("./repositories/user.repository");
const bcrypt = require("bcryptjs");
const common_2 = require("@nestjs/common");
let UserService = class UserService {
    constructor(userRepository) {
        this.userRepository = userRepository;
    }
    async create(createUserDto) {
        const hashedPassword = await bcrypt.hash(createUserDto.password, 10);
        console.log('Hashed Password:', hashedPassword);
        const cpf = createUserDto.identifier.replace(/[^0-9]/g, '');
        if (cpf.length !== 11) {
            throw new Error('O CPF deve conter exatamente 11 dígitos.');
        }
        return await this.userRepository.create({
            ...createUserDto,
            identifier: cpf,
            password: hashedPassword,
        });
    }
    async findAll() {
        return await this.userRepository.findAll();
    }
    async findById(id) {
        const response = await this.userRepository.findById(id);
        if (!response) {
            throw new common_2.NotFoundException(`${id} nao encontrado`);
        }
        return response;
    }
    async update(id, updateUserDto) {
        const cpf = updateUserDto.identifier?.replace(/[^0-9]/g, '');
        const updatedUserDto = {
            ...updateUserDto,
            identifier: cpf,
        };
        return await this.userRepository.update(id, updatedUserDto);
    }
    async remove(id) {
        return await this.userRepository.remove(id);
    }
};
exports.UserService = UserService;
exports.UserService = UserService = __decorate([
    (0, common_1.Injectable)(),
    __metadata("design:paramtypes", [user_repository_1.UserRepository])
], UserService);
//# sourceMappingURL=users.service.js.map