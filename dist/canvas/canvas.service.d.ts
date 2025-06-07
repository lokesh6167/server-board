import { Repository } from 'typeorm';
import { CanvasItem } from './canvas-item.entity';
import { CreateCanvasItemDto } from './dto/create-canvas-item.dto';
export declare class CanvasService {
    private canvasItemRepository;
    constructor(canvasItemRepository: Repository<CanvasItem>);
    create(user: any, dto: CreateCanvasItemDto): Promise<CanvasItem>;
    findByUser(userId: number): Promise<CanvasItem[]>;
    update(id: number, dto: Partial<CreateCanvasItemDto>): Promise<CanvasItem>;
    delete(id: number): Promise<{
        message: string;
    }>;
    findOne(id: number): Promise<CanvasItem>;
    findByType(userId: number, type: string): Promise<CanvasItem[]>;
    private readonly uploadFolder;
    renameFile(oldName: string, newName: string): Promise<string>;
    deleteFile(filename: string): Promise<void>;
}
