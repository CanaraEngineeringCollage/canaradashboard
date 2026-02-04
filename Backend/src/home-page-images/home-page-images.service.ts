import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomePageImage } from './entities/home-page-image.entity';
import { CreateHomePageImageDto } from './dto/create-home-page-image.dto';

@Injectable()
export class HomePageImagesService {
  constructor(
    @InjectRepository(HomePageImage)
    private repo: Repository<HomePageImage>,
  ) {}

  async create(dto: CreateHomePageImageDto, imageFile: Express.Multer.File) {
    const image = this.repo.create({
      ...dto,
      image: imageFile.buffer,
    });
    return this.repo.save(image);
  }

  async findAll() {
    return this.repo.find({
      order: { createdAt: 'DESC' },
    });
  }

  async findOne(id: string) {
    const image = await this.repo.findOneBy({ id });
    if (!image) return null;
    return image;
  }

  async remove(id: string) {
    return this.repo.delete(id);
  }
}
