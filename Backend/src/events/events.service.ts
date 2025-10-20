import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  create(dto: CreateEventDto, file: Express.Multer.File) {
    const event = this.eventRepo.create({
      ...dto,
      image: file.buffer,
    });
    return this.eventRepo.save(event);
  }

 async findAll({
  category,
  search,
  page,
  limit,
  all,
}: {
  category?: string;
  search?: string;
  page?: number;
  limit?: number;
  all?: boolean;
}) {
  const query = this.eventRepo.createQueryBuilder('event')
    .orderBy('event.createdAt', 'DESC');

  if (category && category !== 'All') {
    query.andWhere('event.category = :category', { category });
  }

 if (search) {
  query.andWhere('LOWER(event.title) LIKE LOWER(:search)', { search: `%${search}%` });
}


  if (all) {
    // Return all events without pagination
    const data = await query.getMany();
    return { data, total: data.length };
  }

  const [data, total] = await query
    .skip((page! - 1) * limit!)
    .take(limit!)
    .getManyAndCount();

  return {
    data,
    total,
    page,
    limit,
    totalPages: Math.ceil(total / limit!),
  };
}

  async getCategories() {
    return await this.eventRepo
      .createQueryBuilder('event')
      .select('event.category')
      .distinct(true)
      .where('event.category IS NOT NULL AND event.category != :empty', { empty: '' })
      .getRawMany()
      .then((results) => results.map((r) => r.event_category).filter(Boolean));
  }

  findOne(id: string) {
    return this.eventRepo.findOneBy({ id });
  }

 async countAll() {
  return this.eventRepo.count();
}


  async update(id: string, dto: UpdateEventDto, file?: Express.Multer.File) {
    const existing = await this.eventRepo.findOneBy({ id });
    if (!existing) {
      throw new Error('Event not found');
    }
    const updatedData: any = {
      ...dto,
    };
    if (file) {
      updatedData.image = file.buffer;
    }
    await this.eventRepo.update(id, updatedData);
    return this.eventRepo.findOneBy({ id });
  }

  remove(id: string) {
    return this.eventRepo.delete(id);
  }
}