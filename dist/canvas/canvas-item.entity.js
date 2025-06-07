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
exports.CanvasItem = void 0;
const typeorm_1 = require("typeorm");
const user_entity_1 = require("../users/user.entity");
let CanvasItem = class CanvasItem {
    id;
    user;
    type;
    content;
    x;
    y;
    width;
    height;
    created_at;
};
exports.CanvasItem = CanvasItem;
__decorate([
    (0, typeorm_1.PrimaryGeneratedColumn)(),
    __metadata("design:type", Number)
], CanvasItem.prototype, "id", void 0);
__decorate([
    (0, typeorm_1.ManyToOne)(() => user_entity_1.User, (user) => user.canvasItems, { onDelete: 'CASCADE' }),
    __metadata("design:type", user_entity_1.User)
], CanvasItem.prototype, "user", void 0);
__decorate([
    (0, typeorm_1.Column)(),
    __metadata("design:type", String)
], CanvasItem.prototype, "type", void 0);
__decorate([
    (0, typeorm_1.Column)('text'),
    __metadata("design:type", String)
], CanvasItem.prototype, "content", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CanvasItem.prototype, "x", void 0);
__decorate([
    (0, typeorm_1.Column)('float'),
    __metadata("design:type", Number)
], CanvasItem.prototype, "y", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], CanvasItem.prototype, "width", void 0);
__decorate([
    (0, typeorm_1.Column)('float', { nullable: true }),
    __metadata("design:type", Number)
], CanvasItem.prototype, "height", void 0);
__decorate([
    (0, typeorm_1.CreateDateColumn)(),
    __metadata("design:type", Date)
], CanvasItem.prototype, "created_at", void 0);
exports.CanvasItem = CanvasItem = __decorate([
    (0, typeorm_1.Entity)()
], CanvasItem);
//# sourceMappingURL=canvas-item.entity.js.map