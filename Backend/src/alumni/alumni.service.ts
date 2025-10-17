// src/alumni/alumni.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { Alumni } from './entity/alumni.entity';

@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(Alumni)
    private alumniRepo: Repository<Alumni>,
  ) {}

  create(data: CreateAlumniDto) {
    const alumni = this.alumniRepo.create(data);
    return this.alumniRepo.save(alumni);
  }

  findAll() {
    return this.alumniRepo.find({ order: { createdAt: 'DESC' } });
  }
  async countAll() {
  return this.alumniRepo.count();
}

}
