import { User } from '../users/user.entity';
export declare class CanvasItem {
    id: number;
    user: User;
    type: string;
    content: string;
    x: number;
    y: number;
    width: number;
    height: number;
    created_at: Date;
}
