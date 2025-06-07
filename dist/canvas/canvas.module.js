"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CanvasModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const canvas_controller_1 = require("./canvas.controller");
const canvas_service_1 = require("./canvas.service");
const canvas_item_entity_1 = require("./canvas-item.entity");
let CanvasModule = class CanvasModule {
};
exports.CanvasModule = CanvasModule;
exports.CanvasModule = CanvasModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forFeature([canvas_item_entity_1.CanvasItem]),
        ],
        controllers: [canvas_controller_1.CanvasController],
        providers: [canvas_service_1.CanvasService],
        exports: [canvas_service_1.CanvasService],
    })
], CanvasModule);
//# sourceMappingURL=canvas.module.js.map