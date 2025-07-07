import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
  ) {}

  create(dto: CreateEventDto) {
    const event = this.eventRepo.create(dto);
    return this.eventRepo.save(event);
  }

  findAll() {
    return this.eventRepo.find();
  }

  findOne(id: string) {
    return this.eventRepo.findOneBy({ id });
  }

  update(id: string, dto: UpdateEventDto) {
    return this.eventRepo.update(id, dto);
  }

  remove(id: string) {
    return this.eventRepo.delete(id);
  }
}
