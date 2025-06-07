import { IsString, IsNumber } from 'class-validator';

export class CreateCanvasItemDto {
  @IsString()
  type: string;

  @IsString()
  content: string;

  @IsNumber()
  x: number;

  @IsNumber()
  y: number;

  @IsNumber()
  width: number;

  @IsNumber()
  height: number;
}
