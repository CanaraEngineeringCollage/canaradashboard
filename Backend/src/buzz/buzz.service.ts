import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Buzz } from './entities/buzz.entity';
import { CreateBuzzDto } from './dto/create-buzz.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class BuzzService {
  constructor(
    @InjectRepository(Buzz)
    private readonly buzzRepository: Repository<Buzz>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async getAllBuzz(
    page = 1,
    limit = 10,
    category?: string,
    search?: string,
    excludeCategory?: string,
    edition?: string,
  ) {
    const query = this.buzzRepository
      .createQueryBuilder('buzz')
      .orderBy('buzz.createdAt', 'DESC')
      .skip((page - 1) * limit)
      .take(limit);

    if (category) {
      query.andWhere('buzz.category = :category', { category });
    }

    if (excludeCategory) {
      const excludeArray = excludeCategory.split(',').map((cat) => cat.trim());
      query.andWhere('buzz.category NOT IN (:...excludeArray)', {
        excludeArray,
      });
    }

    if (search) {
      query.andWhere(
        '(buzz.content LIKE :search OR buzz.eventName LIKE :search)',
        { search: `%${search}%` },
      );
    }

    if (category === 'Weekly Digest' && edition) {
      query.andWhere(
        "JSON_SEARCH(buzz.weeklyDigest, 'one', :edition, NULL, '$[*].editionName') IS NOT NULL",
        { edition },
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
    const rawCategories = await this.buzzRepository
      .createQueryBuilder('buzz')
      .select('DISTINCT buzz.category', 'category')
      .where('buzz.category IS NOT NULL')
      .getRawMany();

    const categories = rawCategories.map((c) => c.category);

    // Ensure Weekly Digest is always first
    const weeklyDigestIndex = categories.indexOf('Weekly Digest');
    if (weeklyDigestIndex > -1) {
      categories.splice(weeklyDigestIndex, 1);
      categories.unshift('Weekly Digest');
    }

    return categories;
  }

  async getWeeklyDigestEditions() {
    const records = await this.buzzRepository
      .createQueryBuilder('buzz')
      .select('buzz.weeklyDigest')
      .where('buzz.category = :cat', { cat: 'Weekly Digest' })
      .andWhere('buzz.weeklyDigest IS NOT NULL')
      .getMany();

    const uniqueEditions = new Set<string>();
    records.forEach((buzz) => {
      if (Array.isArray(buzz.weeklyDigest)) {
        buzz.weeklyDigest.forEach((ed: any) => {
          if (ed.editionName) {
            uniqueEditions.add(ed.editionName.trim());
          }
        });
      }
    });

    return Array.from(uniqueEditions).sort();
  }

  async createBuzz(createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    const buzz = this.buzzRepository.create(createBuzzDto);
    const savedBuzz = await this.buzzRepository.save(buzz);
    await this.cacheManager.del('all_buzz');
    return savedBuzz;
  }

  async getBuzzById(id: string): Promise<Buzz> {
    const buzz = await this.buzzRepository.findOne({ where: { id } });
    if (!buzz) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }
    return buzz;
  }

  private deleteOldFiles(oldDigest: any[], newDigest?: any[]) {
    if (!oldDigest || !Array.isArray(oldDigest)) return;

    const oldFiles = new Set<string>();
    oldDigest.forEach((ed: any) => {
      if (Array.isArray(ed.items)) {
        ed.items.forEach((item: any) => {
          if (item.pdf && item.pdf.startsWith('buzz-digest-')) {
            oldFiles.add(item.pdf);
          }
        });
      }
    });

    const newFiles = new Set<string>();
    if (newDigest && Array.isArray(newDigest)) {
      newDigest.forEach((ed: any) => {
        if (Array.isArray(ed.items)) {
          ed.items.forEach((item: any) => {
            if (item.pdf && item.pdf.startsWith('buzz-digest-')) {
              newFiles.add(item.pdf);
            }
          });
        }
      });
    }

    const uploadDir = path.join(process.cwd(), 'uploads');
    oldFiles.forEach((filename) => {
      if (!newFiles.has(filename)) {
        const filePath = path.join(uploadDir, filename);
        if (fs.existsSync(filePath)) {
          try {
            fs.unlinkSync(filePath);
          } catch (e) {
            console.error(`Failed to delete buzz digest file: ${filename}`, e);
          }
        }
      }
    });
  }

  async updateBuzz(id: string, createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    const buzz = await this.buzzRepository.findOne({ where: { id } });
    if (!buzz) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }

    if (buzz.category === 'Weekly Digest') {
      this.deleteOldFiles(buzz.weeklyDigest, createBuzzDto.weeklyDigest);
    }

    Object.assign(buzz, createBuzzDto);
    const updatedBuzz = await this.buzzRepository.save(buzz);
    await this.cacheManager.del('all_buzz');
    return updatedBuzz;
  }

  async deleteBuzz(id: string): Promise<void> {
    const buzz = await this.buzzRepository.findOne({ where: { id } });
    if (!buzz) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }

    if (buzz.category === 'Weekly Digest') {
      this.deleteOldFiles(buzz.weeklyDigest, []); // Pass empty array to delete all
    }

    const result = await this.buzzRepository.delete(id);
    if (result.affected === 0) {
      throw new NotFoundException(`Buzz with ID ${id} not found`);
    }
    await this.cacheManager.del('all_buzz');
  }
}
