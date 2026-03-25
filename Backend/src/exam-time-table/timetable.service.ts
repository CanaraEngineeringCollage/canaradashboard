import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Timetable } from './entity/timetable.entity';

@Injectable()
export class TimetableService {
  constructor(
    @InjectRepository(Timetable)
    private repo: Repository<Timetable>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(academicYear: string, file: Express.Multer.File) {
    const timetable = this.repo.create({
      academicYear,
      file: file.buffer,
      filename: file.originalname,
      mimetype: file.mimetype,
    });
    const savedTimetable = await this.repo.save(timetable);
    await this.cacheManager.del('all_timetable');
    return savedTimetable;
  }

  async findAll() {
    return this.repo.find();
  }

  async remove(id: number) {
    const timetable = await this.repo.findOneBy({ id });
    if (!timetable) throw new NotFoundException('Timetable not found');
    await this.repo.remove(timetable);
    await this.cacheManager.del('all_timetable');
    return { message: 'Deleted successfully' };
  }
}
