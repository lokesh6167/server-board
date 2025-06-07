import { CanvasItem } from '../canvas/canvas-item.entity';
export declare class User {
    id: number;
    email: string;
    password: string;
    created_at: Date;
    canvasItems: CanvasItem[];
}
