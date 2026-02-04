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

@Controller('academic-calendar')
export class AcademicCalendarController {
  constructor(private readonly service: AcademicCalendarService) {}

  @Get('departments')
  async getAvailableDepartments() {
    return this.service.getAvailableDepartments();
  }

  @Get('years')
  async getAvailableYears() {
    return this.service.getAvailableYears();
  }

  @Post()
  @UseInterceptors(FileInterceptor('pdf'))
  create(
    @Body() createDto: CreateAcademicCalendarDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.create(createDto, file);
  }

  @Get()
  async findAll(
    @Query('department') department?: string,
    @Query('year') year?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search?: string,
  ) {
    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1)
      throw new BadRequestException('Invalid page number');
    if (isNaN(limitNum) || limitNum < 1)
      throw new BadRequestException('Invalid limit');

    return this.service.findAll({
      department,
      year,
      page: pageNum,
      limit: limitNum,
      search,
    });
  }

  @Get('count')
  async getCount(@Query('department') department?: string) {
    const count = await this.service.countAll(department);
    return { count };
  }

  @Patch(':id')
  @UseInterceptors(FileInterceptor('pdf'))
  update(
    @Param('id') id: string,
    @Body() body: { year: string; department: string },
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.service.update(+id, body.year, body.department, file);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(+id);
  }
}
