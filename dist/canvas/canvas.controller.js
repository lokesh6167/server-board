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
exports.CanvasController = void 0;
const common_1 = require("@nestjs/common");
const jwt_auth_guard_1 = require("../common/jwt-auth/jwt-auth.guard");
const canvas_service_1 = require("./canvas.service");
const create_canvas_item_dto_1 = require("./dto/create-canvas-item.dto");
const platform_express_1 = require("@nestjs/platform-express");
const multer_1 = require("multer");
const uuid_1 = require("uuid");
const path = require("path");
let CanvasController = class CanvasController {
    canvasService;
    constructor(canvasService) {
        this.canvasService = canvasService;
    }
    create(req, dto) {
        return this.canvasService.create(req.user, dto);
    }
    findAll(req) {
        return this.canvasService.findByUser(req.user.sub);
    }
    update(id, dto) {
        return this.canvasService.update(id, dto);
    }
    delete(id) {
        return this.canvasService.delete(id);
    }
    async rename(filename, newName) {
        await renameFile(filename, newName);
        return { message: 'File renamed', newUrl: `/uploads/${newName}` };
    }
    async remove(filename) {
        await deleteFile(filename);
        return { message: 'File deleted successfully' };
    }
    uploadFile(file) {
        return { url: `http://localhost:3000/uploads/${file.filename}` };
    }
};
exports.CanvasController = CanvasController;
__decorate([
    (0, common_1.Post)(),
    __param(0, (0, common_1.Request)()),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object, create_canvas_item_dto_1.CreateCanvasItemDto]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    __param(0, (0, common_1.Request)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "findAll", null);
__decorate([
    (0, common_1.Patch)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __param(1, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number, Object]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "update", null);
__decorate([
    (0, common_1.Delete)(':id'),
    __param(0, (0, common_1.Param)('id')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Number]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "delete", null);
__decorate([
    (0, common_1.Patch)('rename/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __param(1, (0, common_1.Body)('newName')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "rename", null);
__decorate([
    (0, common_1.Delete)('delete/:filename'),
    __param(0, (0, common_1.Param)('filename')),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", Promise)
], CanvasController.prototype, "remove", null);
__decorate([
    (0, common_1.Post)('upload'),
    (0, common_1.UseInterceptors)((0, platform_express_1.FileInterceptor)('file', {
        storage: (0, multer_1.diskStorage)({
            destination: './uploads',
            filename: (req, file, cb) => {
                const ext = path.extname(file.originalname);
                cb(null, `${(0, uuid_1.v4)()}${ext}`);
            },
        }),
    })),
    __param(0, (0, common_1.UploadedFile)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [Object]),
    __metadata("design:returntype", void 0)
], CanvasController.prototype, "uploadFile", null);
exports.CanvasController = CanvasController = __decorate([
    (0, common_1.Controller)('canvas'),
    (0, common_1.UseGuards)(jwt_auth_guard_1.JwtAuthGuard),
    __metadata("design:paramtypes", [canvas_service_1.CanvasService])
], CanvasController);
//# sourceMappingURL=canvas.controller.js.map