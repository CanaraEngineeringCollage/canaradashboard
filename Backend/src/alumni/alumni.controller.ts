// src/alumni/alumni.controller.ts
import { Controller, Post, Body, Get, UseGuards, Patch, Param, Delete } from '@nestjs/common';
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
  findAll() {
    return this.alumniService.findAll();
  }
  @UseGuards(JwtAuthGuard)
@Get('count')
async getCount() {
  const count = await this.alumniService.countAll();
  return { count };
}

  @Post('podcast')
  createPodcast(@Body() data: CreateAlumniPodcastDto) {
    return this.alumniService.createPodcast(data);
  }

  @Get('podcast')
  findAllPodcasts() {
    return this.alumniService.findAllPodcasts();
  }

  @Patch('podcast/:id')
  updatePodcast(@Param('id') id: string, @Body() data: { url: string }) {
    return this.alumniService.updatePodcast(+id, data.url);
  }

  @Delete('podcast/:id')
  removePodcast(@Param('id') id: string) {
    return this.alumniService.removePodcast(+id);
  }

}
