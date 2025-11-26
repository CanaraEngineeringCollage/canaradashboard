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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FilesService } from './files.service';
import { Response } from 'express';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('files')
export class FilesController {
  constructor(private readonly filesService: FilesService) {}

  @UseGuards(JwtAuthGuard)
@Post('upload')
@UseInterceptors(FileInterceptor('file'))
async uploadFile(
  @UploadedFile() file: Express.Multer.File,
  @Query('type') type: 'pdf' | 'image',
  @Query('name') name?: string,
  @Query('department') department: string = 'Common',
) {
  return this.filesService.uploadFile(file, type, name,department);
}

// files.controller.ts
@Get(':name')
async getFileByName(@Param('name') name: string, @Res() res: Response) {
  const file = await this.filesService.getFileByName(name);
  res.setHeader('Content-Type', file.mimetype);
  res.send(file.file || file.avatar);
}


  // Get file by ID
  @Get(':id')
  async getFile(@Param('id') id: number, @Res() res: Response) {
    const file = await this.filesService.getFile(id);
    res.setHeader('Content-Type', file.mimetype);
    res.send(file.file || file.avatar);
  }

  // Get all files
@Get()
async getAll(
  @Query('search') search?: string,
  @Query('type') type?: 'pdf' | 'image',
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
