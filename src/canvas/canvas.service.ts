import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CanvasItem } from './canvas-item.entity';
import { CreateCanvasItemDto } from './dto/create-canvas-item.dto';
import { promises as fs } from 'fs';
import { join } from 'path';

@Injectable()
export class CanvasService {
  constructor(
    @InjectRepository(CanvasItem)
    private canvasItemRepository: Repository<CanvasItem>,
  ) {}

  async create(user: any, dto: CreateCanvasItemDto): Promise<CanvasItem> {
    const canvasItem = this.canvasItemRepository.create({
      ...dto,
      user: { id: user.sub },
    });
    
    return await this.canvasItemRepository.save(canvasItem);
  }

  async findByUser(userId: number): Promise<CanvasItem[]> {
    return await this.canvasItemRepository.find({
      where: { user: { id: userId } },
      order: { created_at: 'DESC' },
    });
  }

  async update(id: number, dto: Partial<CreateCanvasItemDto>): Promise<CanvasItem> {
    const result = await this.canvasItemRepository.update(id, dto);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Canvas item with ID ${id} not found`);
    }
    
    const updatedItem = await this.canvasItemRepository.findOne({ where: { id } });
    if (!updatedItem) {
      throw new NotFoundException(`Canvas item with ID ${id} not found after update`);
    }
    
    return updatedItem;
  }

  async delete(id: number): Promise<{ message: string }> {
    const result = await this.canvasItemRepository.delete(id);
    
    if (result.affected === 0) {
      throw new NotFoundException(`Canvas item with ID ${id} not found`);
    }
    
    return { message: 'Canvas item deleted successfully' };
  }

  async findOne(id: number): Promise<CanvasItem> {
    const item = await this.canvasItemRepository.findOne({ 
      where: { id },
      relations: ['user'] 
    });
    
    if (!item) {
      throw new NotFoundException(`Canvas item with ID ${id} not found`);
    }
    
    return item;
  }

  async findByType(userId: number, type: string): Promise<CanvasItem[]> {
    return await this.canvasItemRepository.find({
      where: { 
        user: { id: userId },
        type: type 
      },
      order: { created_at: 'DESC' },
    });
  }

  private readonly uploadFolder = join(__dirname, '..', '..', 'file-uploads');

  async renameFile(oldName: string, newName: string): Promise<string> {
    const oldPath = join(this.uploadFolder, oldName);
    const newPath = join(this.uploadFolder, newName);

    try {
      await fs.rename(oldPath, newPath);
      return `/uploads/${newName}`;
    } catch (error) {
      throw new NotFoundException(`File ${oldName} not found.`);
    }
  }

  async deleteFile(filename: string): Promise<void> {
    const filePath = join(this.uploadFolder, filename);

    try {
      await fs.unlink(filePath);
    } catch (error) {
      throw new NotFoundException(`File ${filename} not found.`);
    }
  }
}