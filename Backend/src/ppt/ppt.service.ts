import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { PptLink } from './entities/ppt.entity';

@Injectable()
export class PptService {
  constructor(
    @InjectRepository(PptLink)
    private readonly pptRepo: Repository<PptLink>,
  ) {}

  async getLink() {
    const existing = await this.pptRepo.find({
      order: { updatedAt: 'DESC' },
      take: 1,
    });

    return existing[0] ?? null;
  }

  async updateLink(link: string) {
    const current = await this.getLink();
    const record = current ? { ...current, link } : this.pptRepo.create({ link });
    const saved = await this.pptRepo.save(record);

    return {
      message: 'PPT link updated successfully',
      link: saved.link,
      updatedAt: saved.updatedAt,
    };
  }
}

