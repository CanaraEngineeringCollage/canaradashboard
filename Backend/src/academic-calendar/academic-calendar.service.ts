import { Injectable } from '@nestjs/common';
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
    const calendar = this.repo.create({
      ...createDto,
      pdf: `/uploads/${file.filename}`,
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
      calendar.pdf = `/uploads/${file.filename}`;
    }

    return await this.repo.save(calendar);
  }
}
