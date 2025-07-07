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

  create(dto: CreateEventDto, file: Express.Multer.File) {
    console.log(dto,"dto");
    
  const event = this.eventRepo.create({
    ...dto,
    image: file.buffer, // store the buffer
  });
  console.log(event,"event");
  
  return this.eventRepo.save(event);
}


  findAll() {
    return this.eventRepo.find();
  }

  findOne(id: string) {
    return this.eventRepo.findOneBy({ id });
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
    updatedData.image = file.buffer; // overwrite image only if file is uploaded
  }

  await this.eventRepo.update(id, updatedData);
  return this.eventRepo.findOneBy({ id }); // return updated record
}


  remove(id: string) {
    return this.eventRepo.delete(id);
  }
}
