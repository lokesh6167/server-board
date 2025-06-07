import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CanvasController } from './canvas.controller';
import { CanvasService } from './canvas.service';
import { CanvasItem } from './canvas-item.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([CanvasItem]), // Register CanvasItem entity
  ],
  controllers: [CanvasController],
  providers: [CanvasService],
  exports: [CanvasService], // Export if other modules need it
})
export class CanvasModule {}