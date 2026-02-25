import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  UseInterceptors,
  UploadedFile,
  Res,
  NotFoundException,
  Query,
  BadRequestException,
  Patch,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { AcademicCalendarService } from './academic-calendar.service';
import { CreateAcademicCalendarDto } from './dto/create-academic-calendar.dto';
import { Response } from 'express';
import * as path from 'path';

@Controller('academic-calendar')
export class AcademicCalendarController {
  constructor(private readonly service: AcademicCalendarService) {}

  @Post()
  @UseInterceptors(FileInterceptor('pdf'))
  create(
    @Body() createDto: CreateAcademicCalendarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(createDto, file);
  }

  @Get()
  async findOne() {
    return this.service.findOne();
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('pdf'))
  update(@Param('id') id: string, @UploadedFile() file: Express.Multer.File) {
    return this.service.update(+id, file);
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }
}
