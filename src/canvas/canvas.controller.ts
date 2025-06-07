import {
  Controller,
  Get,
  Post,
  Body,
  UseGuards,
  Request,
  Patch,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { JwtAuthGuard } from '../common/jwt-auth/jwt-auth.guard';
import { CanvasService } from './canvas.service';
import { CreateCanvasItemDto } from './dto/create-canvas-item.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { diskStorage } from 'multer';
import { v4 as uuidv4 } from 'uuid';
import * as path from 'path';

@Controller('canvas')
@UseGuards(JwtAuthGuard)
export class CanvasController {
  constructor(private canvasService: CanvasService) {}

  @Post()
  create(@Request() req, @Body() dto: CreateCanvasItemDto) {
    return this.canvasService.create(req.user, dto);
  }

  @Get()
  findAll(@Request() req) {
    return this.canvasService.findByUser(req.user.sub);
  }

  @Patch(':id')
  update(@Param('id') id: number, @Body() dto: Partial<CreateCanvasItemDto>) {
    return this.canvasService.update(id, dto);
  }

  @Delete(':id')
  delete(@Param('id') id: number) {
    return this.canvasService.delete(id);
  }

   @Patch('rename/:filename')
  async rename(@Param('filename') filename: string, @Body('newName') newName: string) {
    await renameFile(filename, newName);
    return { message: 'File renamed', newUrl: `/uploads/${newName}` };
  }
  
  @Delete('delete/:filename')
  async remove(@Param('filename') filename: string) {
    await deleteFile(filename);
    return { message: 'File deleted successfully' };
  }

  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      storage: diskStorage({
        destination: './uploads',
        filename: (req, file, cb) => {
          const ext = path.extname(file.originalname);
          cb(null, `${uuidv4()}${ext}`);
        },
      }),
    }),
  )
  uploadFile(@UploadedFile() file: Express.Multer.File) {
    return { url: `http://localhost:3000/uploads/${file.filename}` };
  }
}