import {
  Body,
  Controller,
  Get,
  Post,
  Patch,
  Delete,
  Param,
  UseGuards,
  Query,
  UseInterceptors,
  UploadedFile,
  BadRequestException,
  Res,
} from '@nestjs/common';
import { CacheInterceptor, CacheKey } from '@nestjs/cache-manager';
import { FileInterceptor } from '@nestjs/platform-express';
import { Response } from 'express';
import * as path from 'path';
import * as fs from 'fs';
import { BuzzService } from './buzz.service';
import { Buzz } from './entities/buzz.entity';
import { CreateBuzzDto } from './dto/create-buzz.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('buzz')
export class BuzzController {
  constructor(private readonly buzzService: BuzzService) {}

  @Get()
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_buzz')
  async getAllBuzz(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
    @Query('category') category?: string,
    @Query('search') search?: string,
    @Query('excludeCategory') excludeCategory?: string,
    @Query('edition') edition?: string,
  ) {
    return this.buzzService.getAllBuzz(
      page,
      limit,
      category,
      search,
      excludeCategory,
      edition,
    );
  }

  @Get('student-achievements')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_buzz')
  async getStudentAchievements(
    @Query('page') page: number = 1,
    @Query('limit') limit: number = 10,
  ) {
    return this.buzzService.getStudentAchievements(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Post()
  async createBuzz(@Body() createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    return this.buzzService.createBuzz(createBuzzDto);
  }

  @UseGuards(JwtAuthGuard)
  @Post('upload-pdf')
  @UseInterceptors(FileInterceptor('file'))
  async uploadPdf(@UploadedFile() file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('File is required');
    }
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const filename = `buzz-digest-${uniqueSuffix}${extension}`;
    const uploadPath = path.join(uploadDir, filename);

    fs.writeFileSync(uploadPath, file.buffer);

    return { filename };
  }

  @Get('file/:filename')
  getFile(@Param('filename') filename: string, @Res() res: Response) {
    const filePath = path.join(process.cwd(), 'uploads', filename);
    return res.sendFile(filePath);
  }

  @Get('categories')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_buzz')
  async getCategories() {
    return this.buzzService.getCategories();
  }

  @Get('weekly-digest/editions')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_buzz')
  async getWeeklyDigestEditions() {
    return this.buzzService.getWeeklyDigestEditions();
  }

  @Get('count')
  @UseInterceptors(CacheInterceptor)
  @CacheKey('all_buzz')
  async getCount() {
    const count = await this.buzzService.countAll();
    return { count };
  }

  @Get(':id')
  async getBuzz(@Param('id') id: string): Promise<Buzz> {
    return this.buzzService.getBuzzById(id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBuzz(
    @Param('id') id: string,
    @Body() createBuzzDto: CreateBuzzDto,
  ): Promise<Buzz> {
    return this.buzzService.updateBuzz(id, createBuzzDto);
  }
  @UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBuzz(@Param('id') id: string): Promise<void> {
    return this.buzzService.deleteBuzz(id);
  }
}
