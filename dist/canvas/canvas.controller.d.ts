import { CanvasService } from './canvas.service';
import { CreateCanvasItemDto } from './dto/create-canvas-item.dto';
export declare class CanvasController {
    private canvasService;
    constructor(canvasService: CanvasService);
    create(req: any, dto: CreateCanvasItemDto): Promise<import("./canvas-item.entity").CanvasItem>;
    findAll(req: any): Promise<import("./canvas-item.entity").CanvasItem[]>;
    update(id: number, dto: Partial<CreateCanvasItemDto>): Promise<import("./canvas-item.entity").CanvasItem>;
    delete(id: number): Promise<{
        message: string;
    }>;
    rename(filename: string, newName: string): Promise<{
        message: string;
        newUrl: string;
    }>;
    remove(filename: string): Promise<{
        message: string;
    }>;
    uploadFile(file: Express.Multer.File): {
        url: string;
    };
}
