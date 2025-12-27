import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buzz } from './entities/buzz.entity';
import { CreateBuzzDto } from './dto/create-buzz.dto';

@Injectable()
export class BuzzService {
  constructor(
    @InjectRepository(Buzz)
    private readonly buzzRepository: Repository<Buzz>,
  ) {}

 async getAllBuzz(page = 1, limit = 10, category?: string, search?: string, excludeCategory?: string) {
  const query = this.buzzRepository
    .createQueryBuilder("buzz")
    .orderBy("buzz.createdAt", "DESC")
    .skip((page - 1) * limit)
    .take(limit);

  if (category) {
    query.andWhere("buzz.category = :category", { category });
  }

  if (excludeCategory) {
    query.andWhere("buzz.category != :excludeCategory", { excludeCategory });
  }

  if (search) {
    query.andWhere(
      "(buzz.content LIKE :search OR buzz.eventName LIKE :search)",
      { search: `%${search}%` }
    );
  }

  const [data, total] = await query.getManyAndCount();

  return {
    data,
    meta: {
      total,
      page: Number(page),
      limit: Number(limit),
      totalPages: Math.ceil(total / limit),
    },
  };
}

async getStudentAchievements(page = 1, limit = 10) {
  return this.getAllBuzz(page, limit, 'Student Achievements');
}


async countAll() {
  return this.buzzRepository.count();
}
async getCategories() {
  const categories = await this.buzzRepository
    .createQueryBuilder("buzz")
    .select("DISTINCT buzz.category", "category")
    .where("buzz.category IS NOT NULL")
    .getRawMany();

  return categories.map(c => c.category);
}


  async createBuzz(createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    const buzz = this.buzzRepository.create(createBuzzDto);
    return this.buzzRepository.save(buzz);
  }

  async updateBuzz(id: string, createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    const buzz = await this.buzzRepository.findOne({ where: { id } });
    if (!buzz) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }

    Object.assign(buzz, createBuzzDto);
    return this.buzzRepository.save(buzz);
  }

  async deleteBuzz(id: string): Promise<void> {
    const result = await this.buzzRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }
  }
}
