import {
  Controller,
  Post,
  Get,
  Delete,
  Param,
  Body,
  UploadedFile,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { TimetableService } from './timetable.service';
import { CreateTimetableDto } from './dto/timetable.dto';
import { Public } from 'src/auth/public.decorator';



@Controller('timetables')
export class TimetableController {
  constructor(private readonly timetableService: TimetableService) {}

  @Post()
  @UseInterceptors(FileInterceptor('file'))
  @Public()
  async upload(
    @Body() body: CreateTimetableDto,
    @UploadedFile() file: Express.Multer.File,
  ) {
    return this.timetableService.create(body.academicYear, file);
  }

  @Get()
  async findAll() {
    return this.timetableService.findAll();
  }

  @Delete(':id')
  @Public()
  async remove(@Param('id') id: number) {
    return this.timetableService.remove(id);
  }
}
