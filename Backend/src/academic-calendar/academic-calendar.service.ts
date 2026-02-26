import { Injectable } from '@nestjs/common';
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
    const filename = `academic-calendar-${uniqueSuffix}${extension}`;
    const uploadPath = path.join(uploadDir, filename);

    fs.writeFileSync(uploadPath, file.buffer);

    const calendar = this.repo.create({
      ...createDto,
      pdfUrl: filename,
    });
    return await this.repo.save(calendar);
  }

  async findOne() {
    const [calendar] = await this.repo.find({
      order: { createdAt: 'DESC' },
      take: 1,
    });
    return calendar;
  }

  async update(id: number, file?: Express.Multer.File) {
    const calendar = await this.repo.findOne({ where: { id } });
    if (!calendar) {
      throw new Error('Academic Calendar not found');
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
      const filename = `academic-calendar-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
      calendar.pdfUrl = filename;
    }

    return await this.repo.save(calendar);
  }
}
