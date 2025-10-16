// src/faculty/faculty.controller.ts
import {
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  Body,
  UseInterceptors,
  UploadedFile,
  NotFoundException,
  BadRequestException,
  UseGuards,
  Query,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { FacultyService } from './faculty.service';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';   // ✅ import guard


@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  // ✅ Only logged-in admin can create

    @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(FileInterceptor('avatar'))
  async create(
    @Body('data') data: string,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    try {
      const createFacultyDto: CreateFacultyDto = JSON.parse(data);
      if (!createFacultyDto.name || createFacultyDto.name.trim() === '') {
        throw new BadRequestException('Name is required and cannot be empty');
      }
      return await this.facultyService.create(createFacultyDto, avatar);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Public – Anyone can view faculty list
@Get()
  async findAll(@Query('department') department?: string) {
    if (department) {
      return await this.facultyService.findByDepartment(department);
    }
    return await this.facultyService.findAll();
  }


@Get('count')
async getFacultyCount() {
  const count = await this.facultyService.getTotalCount();
  return { count };
}


  // Public – Anyone can view one faculty
  @Get(':id')
  async findOne(@Param('id') id: string) {
    const faculty = await this.facultyService.findOne(id);
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }
    return faculty;
  }

  // ✅ Only logged-in admin can update
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  @UseInterceptors(FileInterceptor('avatar'))
  async update(
    @Param('id') id: string,
    @Body('data') data: string,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    try {
      const updateFacultyDto: UpdateFacultyDto = JSON.parse(data);
      if (!updateFacultyDto.name || updateFacultyDto.name.trim() === '') {
        throw new BadRequestException('Name is required and cannot be empty');
      }
      return await this.facultyService.update(id, updateFacultyDto, avatar);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // ✅ Only logged-in admin can delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.facultyService.remove(id);
  }
}
