import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entities/event.entities';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event) private repo: Repository<Event>
  ) {}

  findAll(): Promise<Event[]> {
    return this.repo.find({ order: { date: 'ASC' } });
  }

  async findFeatured(): Promise<Event> {
    const event = await this.repo.findOne({ where: { type: 'news' }, order: { createdAt: 'DESC' } });
    if (!event) throw new NotFoundException('Featured event not found');
    return event;
  }

  create(data: Partial<Event>) {
    const event = this.repo.create(data);
    console.log(data);
    return this.repo.save(event);
  }

  async update(id: number, data: Partial<Event>) {
    const event = await this.repo.findOneBy({ id });
    if (!event) throw new NotFoundException('Event not found');
    Object.assign(event, data);
    return this.repo.save(event);
  }

  async delete(id: number) {
    const result = await this.repo.delete(id);
    if (result.affected === 0) throw new NotFoundException('Event not found');
    return { message: 'Deleted successfully' };
  }
}