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
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('faculty')
export class FacultyController {
  constructor(private readonly facultyService: FacultyService) {}

  // ✅ Only logged-in admin can create
  @UseGuards(JwtAuthGuard)
  @Post()
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 150 * 1024 * 1024 }, // 150MB limit
    }),
  )
  async create(
    @Body('data') data: string,
    @UploadedFile() avatar?: Express.Multer.File,
  ) {
    try {
      const createFacultyDto: CreateFacultyDto = JSON.parse(data);
      if (!createFacultyDto.name || createFacultyDto.name.trim() === '') {
        throw new BadRequestException('Name is required and cannot be empty');
      }
      // If frontend sent an empty string for joiningDate, remove it so DB won't receive ''
      if (
        Object.prototype.hasOwnProperty.call(createFacultyDto, 'joiningDate') &&
        createFacultyDto.joiningDate === ''
      ) {
        // @ts-ignore
        delete createFacultyDto.joiningDate;
      }
      return await this.facultyService.create(createFacultyDto, avatar);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // Public – Anyone can view faculty list with pagination or all records
  @Get()
  async findAll(
    @Query('department') department?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('all') all?: string, // New query param to fetch all
    @Query('search') search?: string,
  ) {
    if (all === 'true') {
      return await this.facultyService.findAll({
        department,
        all: true,
        search,
      });
    }

    const pageNum = parseInt(page, 10);
    const limitNum = parseInt(limit, 10);

    if (isNaN(pageNum) || pageNum < 1) {
      throw new BadRequestException('Invalid page number');
    }
    if (isNaN(limitNum) || limitNum < 1) {
      throw new BadRequestException('Invalid limit');
    }

    return await this.facultyService.findAll({
      department,
      page: pageNum,
      limit: limitNum,
      search,
    });
  }
  @Get('departments')
  async getDepartments() {
    return await this.facultyService.getDepartments();
  }
  @Get('count')
  async getFacultyCount(@Query('department') department?: string) {
    const count = await this.facultyService.getTotalCount(department);
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
  @UseInterceptors(
    FileInterceptor('avatar', {
      limits: { fileSize: 150 * 1024 * 1024 }, // 150MB limit
    }),
  )
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
      // If frontend sent an empty string for joiningDate on update, remove it to avoid DB errors
      if (
        Object.prototype.hasOwnProperty.call(updateFacultyDto, 'joiningDate') &&
        (updateFacultyDto as any).joiningDate === ''
      ) {
        // @ts-ignore
        delete (updateFacultyDto as any).joiningDate;
      }
      return await this.facultyService.update(id, updateFacultyDto, avatar);
    } catch (error) {
      throw new BadRequestException(error.message);
    }
  }

  // @UseGuards(JwtAuthGuard)
  // @Post('import-data')
  // @UseInterceptors(FileInterceptor('file'))
  // async importData(@UploadedFile() file: Express.Multer.File) {
  //   if (!file) {
  //     throw new BadRequestException('No file uploaded');
  //   }

  //   // Validate file type
  //   if (!file.originalname.match(/\.(xlsx|xls)$/)) {
  //     throw new BadRequestException('Only Excel files are allowed!');
  //   }

  //   return this.facultyService.importFacultyData(file);
  // }

  // ✅ Only logged-in admin can delete
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async remove(@Param('id') id: string) {
    return await this.facultyService.remove(id);
  }
}
