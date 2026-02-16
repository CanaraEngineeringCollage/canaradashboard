import { Injectable, OnModuleInit, Logger } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, ILike } from 'typeorm';
import { Placement } from './entities/placement.entity';
import { TopRecruiter } from './entities/top-recruiter.entity';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { CreateTopRecruiterDto } from './dto/create-top-recruiter.dto';
import { UpdateTopRecruiterDto } from './dto/update-top-recruiter.dto';

@Injectable()
export class PlacementService implements OnModuleInit {
  private readonly logger = new Logger(PlacementService.name);

  constructor(
    @InjectRepository(Placement)
    private placementRepository: Repository<Placement>,
    @InjectRepository(TopRecruiter)
    private topRecruiterRepository: Repository<TopRecruiter>,
  ) {}

  async onModuleInit() {
    this.logger.log('PlacementService initialized');
  }

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

  topRecruitersCount() {
    return this.topRecruiterRepository.count();
  }

  async getTopRecruiters(
    year?: string,
    page: number = 1,
    limit: number = 10,
    search: string = '',
  ) {
    const skip = (page - 1) * limit;
    const whereCondition: any = {};

    console.log('Incoming year:', year); // Debug log

    if (year && year !== 'all') {
      whereCondition.year = year;
    }

    if (search) {
      whereCondition.companyName = ILike(`%${search}%`);
    }

    console.log('Where Condition:', whereCondition); // Debug log

    const [data, total] = await this.topRecruiterRepository.findAndCount({
      where: whereCondition,
      skip,
      take: limit,
      order: { studentsRecruited: 'DESC' },
    });

    return {
      data,
      meta: {
        total,
        page,
        limit,
        totalPages: Math.ceil(total / limit),
      },
    };
  }

  createTopRecruiter(createTopRecruiterDto: CreateTopRecruiterDto) {
    const recruiter = this.topRecruiterRepository.create(createTopRecruiterDto);
    return this.topRecruiterRepository.save(recruiter);
  }

  updateTopRecruiter(id: number, updateTopRecruiterDto: UpdateTopRecruiterDto) {
    return this.topRecruiterRepository.update(id, updateTopRecruiterDto);
  }

  async removeTopRecruiter(id: number) {
    return this.topRecruiterRepository.delete(id);
  }

  async getDistinctYears() {
    const years = await this.topRecruiterRepository
      .createQueryBuilder('tr')
      .select('DISTINCT tr.year', 'year')
      .orderBy('year', 'DESC')
      .getRawMany();
    return years.map((y) => y.year);
  }
}
