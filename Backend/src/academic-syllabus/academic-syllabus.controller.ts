import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Query,
  Res,
  UseGuards,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { AcademicSyllabusService } from './academic-syllabus.service';
import { CreateAcademicSyllabusDto } from './dto/create-academic-syllabus.dto';
import { UpdateAcademicSyllabusDto } from './dto/update-academic-syllabus.dto';
import { Response } from 'express';
import * as path from 'path';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('academic-syllabus')
export class AcademicSyllabusController {
  constructor(private readonly service: AcademicSyllabusService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('pdf'))
  create(
    @Body() createDto: CreateAcademicSyllabusDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(createDto, file);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_academic_syllabus')
  findAll(
    @Query('page') page: string,
    @Query('limit') limit: string,
    @Query('department') department: string,
    @Query('category') category: string,
  ) {
    return this.service.findAll(
      page ? +page : 1,
      limit ? +limit : 10,
      department,
      category,
    );
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(+id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('pdf'))
  update(
    @Param('id') id: string,
    @Body() updateDto: UpdateAcademicSyllabusDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(+id, updateDto, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
