import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { Event } from './entity/event.entity';

@Injectable()
export class EventsService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  findAll() {
    return this.eventRepo.find();
  }

  async findOne(id: number) {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) throw new NotFoundException('Event not found');
    return event;
  }

  async create(dto: CreateEventDto, image: string) {
    const newEvent = this.eventRepo.create({ ...dto, image });
    return this.eventRepo.save(newEvent);
  }

  async update(id: number, dto: UpdateEventDto, image?: string) {
    const event = await this.findOne(id);
    if (image) event.image = image;
    Object.assign(event, dto);
    return this.eventRepo.save(event);
  }

  async remove(id: number) {
    const event = await this.findOne(id);
    return this.eventRepo.remove(event);
  }
}
