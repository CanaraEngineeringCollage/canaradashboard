import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  ParseFilePipe,
  MaxFileSizeValidator,
  FileTypeValidator,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { HomePageImagesService } from './home-page-images.service';
import { CreateHomePageImageDto } from './dto/create-home-page-image.dto';

@Controller('home-page-images')
export class HomePageImagesController {
  constructor(private readonly service: HomePageImagesService) {}

  @Post()
  @UseInterceptors(FileInterceptor('image'))
  create(
    @Body() dto: CreateHomePageImageDto,
    @UploadedFile(
      new ParseFilePipe({
        validators: [
          new MaxFileSizeValidator({ maxSize: 10 * 1024 * 1024 }), // 10MB
          new FileTypeValidator({ fileType: /^image\/(jpeg|png|webp|jpg)$/ }),
        ],
      }),
    )
    image: Express.Multer.File,
  ) {
    return this.service.create(dto, image);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
