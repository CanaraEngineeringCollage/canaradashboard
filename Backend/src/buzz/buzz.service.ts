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

  async getAllBuzz(): Promise<Buzz[]> {
    return this.buzzRepository.find({
      order: {
        createdAt: 'DESC',
      },
    });
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
