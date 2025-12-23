import {
  Controller, Get, Post, Put, Delete, Param, Body, Query,
  UseInterceptors, UploadedFiles, UseGuards, BadRequestException
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { EventService } from './events.service';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { S3Service } from './s3.service';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('events')
export class EventController {
  constructor(
    private readonly eventService: EventService,
    private readonly s3Service: S3Service,
  ) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ])
  )
  async create(
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() dto: CreateEventDto,
  ) {
    const imageFile = files.image ? files.image[0] : undefined;
    const videoFile = files.video ? files.video[0] : undefined;

    // Strict Validation Logic
    if (dto.category === 'Alumni') {
      // Alumni: Must have Image XOR Video
      if (imageFile && videoFile) {
        throw new BadRequestException('Alumni events can have either an image or a video, not both.');
      }
      if (!imageFile && !videoFile) {
        throw new BadRequestException('For Alumni events, either an Image or a Video is required.');
      }
    } else {
      // Others: Must have Image, Cannot have Video
      if (videoFile) {
        throw new BadRequestException('Video upload is only allowed for Alumni events.');
      }
      if (!imageFile) {
        throw new BadRequestException('Image file is required.');
      }
    }

    let videoUrl: string | undefined;
    if (videoFile) {
      videoUrl = await this.s3Service.uploadFile(videoFile);
    }

    return this.eventService.create(dto, imageFile, videoUrl);
  }

  @Get()
  async findAll(
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('all') all?: string,
    @Query('sortBy') sortBy: 'date' | 'createdAt' = 'createdAt',
  ) {
    if (all === 'true') {
      return await this.eventService.findAll({ category, search, all: true, sortBy });
    }

    return await this.eventService.findAll({
      category, search, page: parseInt(page), limit: parseInt(limit), sortBy
    });
  }

  @Get('count')
  async getCount() {
    const count = await this.eventService.countAll();
    return { count };
  }

  @Get('categories')
  async getCategories() {
    return await this.eventService.getCategories();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.eventService.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ])
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @UploadedFiles() files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
  ) {
    let videoUrl: string | undefined;
    if (files.video && files.video[0]) {
      videoUrl = await this.s3Service.uploadFile(files.video[0]);
    }

    const imageFile = files.image ? files.image[0] : undefined;
    return this.eventService.update(id, dto, imageFile, videoUrl);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.eventService.remove(id);
  }
}