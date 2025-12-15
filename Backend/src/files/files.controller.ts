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

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
@Post('upload')
@UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 150 * 1024 * 1024 }, // 150MB limit
  }))
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Query('type') type: 'pdf' | 'image' | 'video',
  @Query('name') name?: string,
  @Query('department') department: string = 'Common',
) {
  if (!file) {
    throw new BadRequestException('File is required');
  }
  return this.filesService.uploadFile(file, type, name,department);
}

// files.controller.ts
@Get(':name')
async getFileByName(@Param('name') name: string, @Res() res: Response) {
  const file = await this.filesService.getFileByName(name);
  
  if (file.type === 'video' && file.video) {
    const filePath = path.join(process.cwd(), 'uploads', file.video);
    res.setHeader('Content-Type', file.mimetype);
    res.sendFile(filePath);
  } else {
    res.setHeader('Content-Type', file.mimetype);
    res.send(file.file || file.avatar);
  }
}


  // Get file by ID
  @Get(':id')
  async getFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.filesService.getFile(id);
    
    if (file.type === 'video' && file.video) {
      const filePath = path.join(process.cwd(), 'uploads', file.video);
      res.setHeader('Content-Type', file.mimetype);
      res.sendFile(filePath);
    } else {
      res.setHeader('Content-Type', file.mimetype);
      res.send(file.file || file.avatar);
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
