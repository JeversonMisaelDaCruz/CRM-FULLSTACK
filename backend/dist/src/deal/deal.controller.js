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
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealController = void 0;
const common_1 = require("@nestjs/common");
const deal_service_1 = require("./deal.service");
const create_deal_dto_1 = require("./dto/create-deal.dto");
const update_deal_dto_1 = require("./dto/update-deal.dto");
let DealController = class DealController {
    constructor(dealService) {
        this.dealService = dealService;
    }
    create(createDealDto) {
        return this.dealService.create(createDealDto);
    }
    findAll() {
        return this.dealService.findAll();
    }
    findOne(id) {
        return this.dealService.findById(id);
    }
    update(id, updateDealDto) {
        return this.dealService.update(id, updateDealDto);
    }
    remove(id) {
        return this.dealService.remove(id);
    }
};
exports.DealController = DealController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_deal_dto_1.CreateDealDTO]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", []),
    __metadata("design:returntype", void 0)
], DealController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "findOne", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, update_deal_dto_1.UpdateDealDTO]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DealController.prototype, "remove", null);
exports.DealController = DealController = __decorate([
    (0, common_1.Controller)('deals'),
    __metadata("design:paramtypes", [deal_service_1.DealService])
], DealController);
//# sourceMappingURL=deal.controller.js.map