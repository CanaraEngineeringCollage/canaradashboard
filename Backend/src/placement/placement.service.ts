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

  findAll() {
    return this.placementRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
  }
}
