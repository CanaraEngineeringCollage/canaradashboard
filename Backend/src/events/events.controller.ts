import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
  BadRequestException,
  Res,
  Header,
} from '@nestjs/common';
import { Response } from 'express';
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
    ]),
  )
  async create(
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
    @Body() dto: CreateEventDto,
  ) {
    console.log('--- Create Event Request Received ---');
    console.log('DTO:', JSON.stringify(dto, null, 2));
    console.log('Files Keys:', files ? Object.keys(files) : 'No files object');
    if (files) {
      if (files.image)
        console.log(
          'Image File:',
          files.image[0].originalname,
          files.image[0].size,
        );
      if (files.video)
        console.log(
          'Video File:',
          files.video[0].originalname,
          files.video[0].size,
        );
    }

    const imageFile = files.image ? files.image[0] : undefined;
    const videoFile = files.video ? files.video[0] : undefined;

    // Strict Validation Logic
    if (dto.category === 'Alumni') {
      // Alumni: Must have Image XOR Video
      if (imageFile && videoFile) {
        throw new BadRequestException(
          'Alumni events can have either an image or a video, not both.',
        );
      }
      if (!imageFile && !videoFile) {
        throw new BadRequestException(
          'For Alumni events, either an Image or a Video is required. Received neither.',
        );
      }
    } else {
      // Others: Must have Image, Cannot have Video
      if (videoFile) {
        throw new BadRequestException(
          `Video upload is only allowed for Alumni events. Category received: ${dto.category}`,
        );
      }
      if (!imageFile) {
        throw new BadRequestException(
          `Image file is required for category: ${dto.category}. Files received: ${files ? Object.keys(files).join(',') : 'none'}`,
        );
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
    let result;
    if (all === 'true') {
      result = await this.eventService.findAll({
        category,
        search,
        all: true,
        sortBy,
      });
    } else {
      result = await this.eventService.findAll({
        category,
        search,
        page: parseInt(page),
        limit: parseInt(limit),
        sortBy,
      });
    }

    // Strip out the heavy image buffer from all items
    if (result && result.data) {
      result.data.forEach((event: any) => {
        event.hasImage = !!event.image;
        delete event.image;
      });
    }
    return result;
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
  async findOne(@Param('id') id: string) {
    const event = await this.eventService.findOne(id);
    if (event) {
      (event as any).hasImage = !!event.image;
      delete (event as any).image;
    }
    return event;
  }

  @Get(':id/image')
  @Header('Content-Type', 'image/jpeg')
  async getEventImage(@Param('id') id: string, @Res() res: Response) {
    const event = await this.eventService.findOne(id);
    if (!event || !event.image) {
      return res.status(404).send('Image not found');
    }
    // Send standard node buffer to express response
    res.send(event.image);
  }

  @UseGuards(JwtAuthGuard)
  @Put(':id')
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'video', maxCount: 1 },
    ]),
  )
  async update(
    @Param('id') id: string,
    @Body() dto: UpdateEventDto,
    @UploadedFiles()
    files: { image?: Express.Multer.File[]; video?: Express.Multer.File[] },
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
