import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  UseGuards,
} from '@nestjs/common';
import { GalleryService } from './gallery.service';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';
import { FileInterceptor } from '@nestjs/platform-express';
import { multerConfig } from 'src/config/multer.config';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('gallery')
export class GalleryController {
  constructor(private readonly galleryService: GalleryService) {}
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('image', multerConfig))
  create(
    @Body() createGalleryDto: CreateGalleryDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    if (!file) {
      throw new BadRequestException('Image file is required');
    }
    return this.galleryService.create(createGalleryDto, file);
  }

  @Get()
  findAll(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category: string,
    @Query('search') search: string,
    @Query('all') all: string,
  ) {
    return this.galleryService.findAll({
      page: Number(page),
      limit: Number(limit),
      category,
      search,
      all: all === 'true',
    });
  }

  @Get('categories')
  getCategories() {
    return this.galleryService.getCategories();
  }
  @UseGuards(JwtAuthGuard)
  @Get('count')
  async countAll() {
    const count = await this.galleryService.countAll();
    return { count };
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.galleryService.findOne(id);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('image', multerConfig))
  update(
    @Param('id') id: string,
    @Body() updateGalleryDto: UpdateGalleryDto,
    @UploadedFile() file?: Express.Multer.File,
  ) {
    return this.galleryService.update(id, updateGalleryDto, file);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.galleryService.remove(id);
  }
}
