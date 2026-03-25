// src/alumni/alumni.controller.ts
import {
  Controller,
  Post,
  Body,
  Get,
  UseGuards,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  Res,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { Response } from 'express';
import * as path from 'path';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { CreateAlumniPodcastDto } from './dto/create-alumni-podcast.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  create(@Body() data: CreateAlumniDto) {
    return this.alumniService.create(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_alumni')
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.alumniService.findAll(+page, +limit);
  }
  @UseGuards(JwtAuthGuard)
  @Get('count')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_alumni')
  async getCount() {
    const count = await this.alumniService.countAll();
    return { count };
  }
  @UseGuards(JwtAuthGuard)
  @Post('podcast')
  @UseInterceptors(FileInterceptor('thumbnail'))
  createPodcast(
    @Body() data: CreateAlumniPodcastDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alumniService.createPodcast(data, file);
  }

  @Get('podcast')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_alumni')
  findAllPodcasts() {
    return this.alumniService.findAllPodcasts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('podcast/count')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_alumni')
  async getPodcastCount() {
    const count = await this.alumniService.countPodcasts();
    return { count };
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('podcast/:id')
  @UseInterceptors(FileInterceptor('thumbnail'))
  updatePodcast(
    @Param('id') id: string,
    @Body() data: { title: string; url: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alumniService.updatePodcast(+id, data.title, data.url, file);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('podcast/:id')
  removePodcast(@Param('id') id: string) {
    return this.alumniService.removePodcast(+id);
  }
}
