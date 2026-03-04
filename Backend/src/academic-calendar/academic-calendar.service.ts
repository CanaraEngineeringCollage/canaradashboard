import { Injectable, NotFoundException } from '@nestjs/common';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicCalendar } from './entities/academic-calendar.entity';
import { CreateAcademicCalendarDto } from './dto/create-academic-calendar.dto';

@Injectable()
export class AcademicCalendarService {
  constructor(
    @InjectRepository(AcademicCalendar)
    private readonly repo: Repository<AcademicCalendar>,
  ) {}

  async create(
    createDto: CreateAcademicCalendarDto,
    file: Express.Multer.File,
  ) {
    if (!file) throw new Error('No PDF file provided');

    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(file.originalname);
    const baseName = path
      .basename(file.originalname, extension)
      .replace(/[^a-zA-Z0-9-]/g, '-');
    const filename = `${baseName}-${uniqueSuffix}${extension}`;
    const uploadPath = path.join(uploadDir, filename);

    fs.writeFileSync(uploadPath, file.buffer);

    const calendar = this.repo.create({
      ...createDto,
      pdfUrl: filename,
    });
    return await this.repo.save(calendar);
  }

  async findAll() {
    return await this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: number) {
    const calendar = await this.repo.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException(`Academic Calendar with ID ${id} not found`);
    }
    return calendar;
  }

  async update(
    id: number,
    updateDto?: { title?: string },
    file?: Express.Multer.File,
  ) {
    const calendar = await this.repo.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException('Academic Calendar not found');
    }

    if (updateDto?.title !== undefined) {
      calendar.title = updateDto.title;
    }

    if (file) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      if (calendar.pdfUrl) {
        const oldFile = path.join(uploadDir, calendar.pdfUrl);
        if (fs.existsSync(oldFile)) {
          try {
            fs.unlinkSync(oldFile);
          } catch (e) {
            console.error('Failed to delete older abstract calendar file', e);
          }
        }
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, extension)
        .replace(/[^a-zA-Z0-9-]/g, '-');
      const filename = `${baseName}-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
      calendar.pdfUrl = filename;
    }

    return await this.repo.save(calendar);
  }

  async remove(id: number) {
    const calendar = await this.repo.findOne({ where: { id } });
    if (!calendar) {
      throw new NotFoundException(`Academic Calendar with ID ${id} not found`);
    }

    if (calendar.pdfUrl) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      const oldFile = path.join(uploadDir, calendar.pdfUrl);
      if (fs.existsSync(oldFile)) {
        try {
          fs.unlinkSync(oldFile);
        } catch (e) {
          console.error('Failed to delete calendar file', e);
        }
      }
    }

    return await this.repo.remove(calendar);
  }
}
