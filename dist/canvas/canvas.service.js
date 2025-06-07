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
exports.CanvasService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const canvas_item_entity_1 = require("./canvas-item.entity");
const fs_1 = require("fs");
const path_1 = require("path");
let CanvasService = class CanvasService {
    canvasItemRepository;
    constructor(canvasItemRepository) {
        this.canvasItemRepository = canvasItemRepository;
    }
    async create(user, dto) {
        const canvasItem = this.canvasItemRepository.create({
            ...dto,
            user: { id: user.sub },
        });
        return await this.canvasItemRepository.save(canvasItem);
    }
    async findByUser(userId) {
        return await this.canvasItemRepository.find({
            where: { user: { id: userId } },
            order: { created_at: 'DESC' },
        });
    }
    async update(id, dto) {
        const result = await this.canvasItemRepository.update(id, dto);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Canvas item with ID ${id} not found`);
        }
        const updatedItem = await this.canvasItemRepository.findOne({ where: { id } });
        if (!updatedItem) {
            throw new common_1.NotFoundException(`Canvas item with ID ${id} not found after update`);
        }
        return updatedItem;
    }
    async delete(id) {
        const result = await this.canvasItemRepository.delete(id);
        if (result.affected === 0) {
            throw new common_1.NotFoundException(`Canvas item with ID ${id} not found`);
        }
        return { message: 'Canvas item deleted successfully' };
    }
    async findOne(id) {
        const item = await this.canvasItemRepository.findOne({
            where: { id },
            relations: ['user']
        });
        if (!item) {
            throw new common_1.NotFoundException(`Canvas item with ID ${id} not found`);
        }
        return item;
    }
    async findByType(userId, type) {
        return await this.canvasItemRepository.find({
            where: {
                user: { id: userId },
                type: type
            },
            order: { created_at: 'DESC' },
        });
    }
    uploadFolder = (0, path_1.join)(__dirname, '..', '..', 'file-uploads');
    async renameFile(oldName, newName) {
        const oldPath = (0, path_1.join)(this.uploadFolder, oldName);
        const newPath = (0, path_1.join)(this.uploadFolder, newName);
        try {
            await fs_1.promises.rename(oldPath, newPath);
            return `/uploads/${newName}`;
        }
        catch (error) {
            throw new common_1.NotFoundException(`File ${oldName} not found.`);
        }
    }
    async deleteFile(filename) {
        const filePath = (0, path_1.join)(this.uploadFolder, filename);
        try {
            await fs_1.promises.unlink(filePath);
        }
        catch (error) {
            throw new common_1.NotFoundException(`File ${filename} not found.`);
        }
    }
};
exports.CanvasService = CanvasService;
exports.CanvasService = CanvasService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(canvas_item_entity_1.CanvasItem)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], CanvasService);
//# sourceMappingURL=canvas.service.js.map