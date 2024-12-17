"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DealEventModule = void 0;
const common_1 = require("@nestjs/common");
const deal_event_service_1 = require("./deal_event.service");
const deal_event_controller_1 = require("./deal_event.controller");
let DealEventModule = class DealEventModule {
};
exports.DealEventModule = DealEventModule;
exports.DealEventModule = DealEventModule = __decorate([
    (0, common_1.Module)({
        controllers: [deal_event_controller_1.DealEventController],
        providers: [deal_event_service_1.DealEventService],
    })
], DealEventModule);
//# sourceMappingURL=deal_event.module.js.map