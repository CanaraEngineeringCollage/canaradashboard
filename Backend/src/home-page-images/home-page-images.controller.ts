import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFiles,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
  BadRequestException,
  Res,
  UseGuards,
} from '@nestjs/common';
import { Response } from 'express';
import * as path from 'path';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { HomePageImagesService } from './home-page-images.service';
import { CreateHomePageImageDto } from './dto/create-home-page-image.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('home-page-images')
export class HomePageImagesController {
  constructor(private readonly service: HomePageImagesService) {}

  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'image', maxCount: 1 },
      { name: 'mobileImage', maxCount: 1 },
    ]),
  )
  create(
    @Body() dto: CreateHomePageImageDto,
    @UploadedFiles()
    files: {
      image?: Express.Multer.File[];
      mobileImage?: Express.Multer.File[];
    },
  ) {
    const imageFile = files.image?.[0];
    const mobileImageFile = files.mobileImage?.[0];

    if (!imageFile || !mobileImageFile) {
      throw new BadRequestException(
        'Both desktop and mobile images are required',
      );
    }

    return this.service.create(dto, imageFile, mobileImageFile);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }
}
