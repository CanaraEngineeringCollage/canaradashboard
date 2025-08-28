import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateScstGrievanceDto } from './dto/create-scst-grievance.dto';
import { ScstGrievance } from './entity/scst-grievance.entity';

@Injectable()
export class ScstGrievanceService {
  constructor(
    @InjectRepository(ScstGrievance)
    private scstGrievanceRepo: Repository<ScstGrievance>,
  ) {}

  async create(dto: CreateScstGrievanceDto): Promise<ScstGrievance> {
    const grievance = this.scstGrievanceRepo.create(dto);
    return this.scstGrievanceRepo.save(grievance);
  }

  async findAll(): Promise<ScstGrievance[]> {
    return this.scstGrievanceRepo.find({ order: { created_at: 'DESC' } });
  }
}
