import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Placement } from './entities/placement.entity';
import { CreatePlacementDto } from './dto/create-placement.dto';

@Injectable()
export class PlacementService {
  constructor(
    @InjectRepository(Placement)
    private placementRepository: Repository<Placement>,
  ) {}

  create(createPlacementDto: CreatePlacementDto) {
    const placement = this.placementRepository.create(createPlacementDto);
    return this.placementRepository.save(placement);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.placementRepository.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { data, total };
  }

  count() {
    return this.placementRepository.count();
  }
}
