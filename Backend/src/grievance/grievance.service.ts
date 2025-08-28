import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { CreateGrievanceDto } from './dto/create-grievance.dto';
import { Grievance } from './entity/grievance.entity';

@Injectable()
export class GrievanceService {
  constructor(
    @InjectRepository(Grievance)
    private grievanceRepository: Repository<Grievance>,
  ) {}

  async create(createGrievanceDto: CreateGrievanceDto): Promise<Grievance> {
    const grievance = this.grievanceRepository.create(createGrievanceDto);
    return this.grievanceRepository.save(grievance);
  }

  async findAll(): Promise<Grievance[]> {
    return this.grievanceRepository.find();
  }
}
