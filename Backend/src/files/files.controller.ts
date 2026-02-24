import {
  Controller,
  Post,
  Get,
  Param,
  Delete,
  UploadedFile,
  UseInterceptors,
  Res,
  Query,
  UseGuards,
  BadRequestException,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import * as path from 'path';
import { multerConfig } from 'src/config/multer.config';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
  @Post('upload')
  @UseInterceptors(
    FileInterceptor('file', {
      ...multerConfig,
      limits: { fileSize: 150 * 1024 * 1024 }, // 150MB limit
    }),
  )
  async uploadFile(
    @UploadedFile() file: Express.Multer.File,
    @Query('type') type: 'pdf' | 'image' | 'video',
    @Query('name') name?: string,
    @Query('department') department: string = 'Common',
  ) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    return this.filesService.uploadFile(file, type, name, department);
  }

  // files.controller.ts
  @Get(':name')
  async getFileByName(@Param('name') name: string, @Res() res: Response) {
    const file = await this.filesService.getFileByName(name);

    if (file.type === 'video' && file.video) {
      // If video is just the filename or a full path, let's normalize it
      const videoStr = file.video.startsWith('/uploads/')
        ? file.video
        : `/uploads/${file.video}`;
      const filePath = path.join(process.cwd(), videoStr);
      res.setHeader('Content-Type', file.mimetype);
      res.sendFile(filePath);
    } else {
      const filePath = path.join(process.cwd(), file.file || file.avatar || '');
      res.setHeader('Content-Type', file.mimetype);
      res.sendFile(filePath);
    }
  }

  // Get file by ID
  @Get(':id')
  async getFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.filesService.getFile(id);

    if (file.type === 'video' && file.video) {
      const videoStr = file.video.startsWith('/uploads/')
        ? file.video
        : `/uploads/${file.video}`;
      const filePath = path.join(process.cwd(), videoStr);
      res.setHeader('Content-Type', file.mimetype);
      res.sendFile(filePath);
    } else {
      const filePath = path.join(process.cwd(), file.file || file.avatar || '');
      res.setHeader('Content-Type', file.mimetype);
      res.sendFile(filePath);
    }
  }

  // Get all files
  @Get()
  async getAll(
    @Query('search') search?: string,
    @Query('type') type?: 'pdf' | 'image' | 'video',
    @Query('department') department?: string,
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.filesService.getAllFiles(search, type, department, page, limit);
  }

  @UseGuards(JwtAuthGuard)
  // Delete file
  @Delete(':id')
  async deleteFile(@Param('id') id: number) {
    return this.filesService.deleteFile(id);
  }
}
