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
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { CreateAlumniPodcastDto } from './dto/create-alumni-podcast.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { multerConfig } from 'src/config/multer.config';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  create(@Body() data: CreateAlumniDto) {
    return this.alumniService.create(data);
  }
  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.alumniService.findAll(+page, +limit);
  }
  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getCount() {
    const count = await this.alumniService.countAll();
    return { count };
  }
  @UseGuards(JwtAuthGuard)
  @Post('podcast')
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  createPodcast(
    @Body() data: CreateAlumniPodcastDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alumniService.createPodcast(data, file);
  }

  @Get('podcast')
  findAllPodcasts() {
    return this.alumniService.findAllPodcasts();
  }

  @UseGuards(JwtAuthGuard)
  @Get('podcast/count')
  async getPodcastCount() {
    const count = await this.alumniService.countPodcasts();
    return { count };
  }

  @Patch('podcast/:id')
  @UseInterceptors(FileInterceptor('thumbnail', multerConfig))
  updatePodcast(
    @Param('id') id: string,
    @Body() data: { title: string; url: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.alumniService.updatePodcast(+id, data.title, data.url, file);
  }

  @Delete('podcast/:id')
  removePodcast(@Param('id') id: string) {
    return this.alumniService.removePodcast(+id);
  }
}
