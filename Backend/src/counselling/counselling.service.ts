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

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.repo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { data, total };
  }
  async countAll () {
  return this.repo.count();
}
}

