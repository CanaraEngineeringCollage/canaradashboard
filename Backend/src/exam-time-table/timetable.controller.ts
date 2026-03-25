import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
  UseGuards,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/timetable.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}
@UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('file', {
    limits: { fileSize: 150 * 1024 * 1024 }, // 150MB limit
  }))
  async upload(
    @Body() body: CreateTimetableDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.timetableService.create(body.academicYear, file);
  }

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_timetable')
  async findAll() {
    return this.timetableService.findAll();
  }
@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: number) {
    return this.timetableService.remove(id);
  }
}
