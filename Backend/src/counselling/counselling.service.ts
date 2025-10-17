import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Counselling } from './entity/counselling.entity';
import { CreateCounsellingDto } from './dto/counselling.dto';


@Injectable()
export class CounsellingService {
  constructor(
    @InjectRepository(Counselling)
    private repo: Repository<Counselling>,
  ) {}

  async create(data: CreateCounsellingDto) {
    const counselling = this.repo.create(data);
    return this.repo.save(counselling);
  }

  async findAll() {
    return this.repo.find({ order: { createdAt: 'DESC' } });
  }
  async countAll () {
  return this.repo.count();
}
}

