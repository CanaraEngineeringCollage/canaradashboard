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

  async getAvailableDepartments() {
    const rawData = await this.repo
      .createQueryBuilder('calendar')
      .select('DISTINCT calendar.department', 'department')
      .getRawMany();

    return rawData.map((item) => item.department);
  }

  async getAvailableYears() {
    const rawData = await this.repo
      .createQueryBuilder('calendar')
      .select('DISTINCT calendar.year', 'year')
      .orderBy('year', 'DESC')
      .getRawMany();

    return rawData.map((item) => item.year);
  }

  async create(
    createDto: CreateAcademicCalendarDto,
    file: Express.Multer.File,
  ) {
    const calendar = this.repo.create({
      ...createDto,
      pdf: file.buffer,
    });
    return await this.repo.save(calendar);
  }

  async findAll({
    department,
    year,
    page,
    limit,
    search,
  }: {
    department?: string;
    year?: string;
    page?: number;
    limit?: number;
    search?: string;
  }) {
    const query = this.repo
      .createQueryBuilder('calendar')
      .orderBy('calendar.createdAt', 'DESC')
      .select([
        'calendar.id',
        'calendar.year',
        'calendar.department',
        'calendar.createdAt',
        'calendar.pdf',
      ]);

    if (department) {
      query.where('calendar.department = :department', { department });
    }

    if (year) {
      query.andWhere('calendar.year = :year', { year });
    }

    if (search) {
      query.andWhere(
        '(calendar.year LIKE :search OR calendar.department LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (!page || !limit) {
      return await query.getMany();
    }

    const [data, total] = await query
      .skip((page - 1) * limit)
      .take(limit)
      .getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async countAll(department?: string) {
    if (department) {
      return await this.repo.count({ where: { department } });
    }
    return await this.repo.count();
  }

  async update(
    id: number,
    year: string,
    department: string,
    file?: Express.Multer.File,
  ) {
    const calendar = await this.repo.findOne({ where: { id } });
    if (!calendar) {
      throw new Error('Academic Calendar not found');
    }

    calendar.year = year;
    calendar.department = department;

    if (file) {
      calendar.pdf = file.buffer;
    }

    return await this.repo.save(calendar);
  }

  async remove(id: number) {
    return await this.repo.delete(id);
  }
}
