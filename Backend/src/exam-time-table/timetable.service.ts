import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from './entity/timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private repo: Repository<Timetable>,
  ) {}

  async create(academicYear: string, file: Express.Multer.File) {
    const timetable = this.repo.create({
      academicYear,
      file: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
    return this.repo.save(timetable);
  }

  async findAll() {
    return this.repo.find();
  }

  async remove(id: number) {
    const timetable = await this.repo.findOneBy({ id });
    if (!timetable) throw new NotFoundException('Timetable not found');
    await this.repo.remove(timetable);
    return { message: 'Deleted successfully' };
  }
}
