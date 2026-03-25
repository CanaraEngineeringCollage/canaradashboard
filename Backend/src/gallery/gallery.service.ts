import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Gallery } from './entity/gallery.entity';
import { CreateGalleryDto } from './dto/create-gallery.dto';
import { UpdateGalleryDto } from './dto/update-gallery.dto';

@Injectable()
export class GalleryService {
  constructor(
    @InjectRepository(Gallery)
    private galleryRepo: Repository<Gallery>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(dto: CreateGalleryDto, imageFile: Express.Multer.File) {
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extension = path.extname(imageFile.originalname);
    const filename = `gallery-${uniqueSuffix}${extension}`;
    const uploadPath = path.join(uploadDir, filename);

    fs.writeFileSync(uploadPath, imageFile.buffer);

    const gallery = this.galleryRepo.create({
      ...dto,
      imageUrl: filename,
    });
    const savedGallery = await this.galleryRepo.save(gallery);
    await this.cacheManager.del('all_gallery');
    return savedGallery;
  }

  async findAll({ category, search, page, limit, all }: any) {
    const query = this.galleryRepo.createQueryBuilder('gallery');

    query.orderBy('gallery.createdAt', 'DESC');

    if (category && category !== 'All') {
      query.andWhere('gallery.category = :category', { category });
    }

    if (search) {
      query.andWhere('LOWER(gallery.title) LIKE LOWER(:search)', {
        search: `%${search}%`,
      });
    }

    let data: Gallery[] = [];
    let total = 0;

    if (all) {
      data = await query.getMany();
      total = data.length;
    } else {
      [data, total] = await query
        .skip((page - 1) * limit)
        .take(limit)
        .getManyAndCount();
    }

    return {
      data,
      total,
      page,
      limit,
      totalPages: limit ? Math.ceil(total / limit) : 1,
    };
  }

  async findOne(id: string) {
    const gallery = await this.galleryRepo.findOneBy({ id });
    if (!gallery) return null;
    return gallery;
  }

  async update(id: string, dto: UpdateGalleryDto, file?: Express.Multer.File) {
    const existing = await this.galleryRepo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Gallery item not found');

    const updatedData: any = { ...dto };

    if (file) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const filename = `gallery-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
      updatedData.imageUrl = filename;
    }

    await this.galleryRepo.update(id, updatedData);
    await this.cacheManager.del('all_gallery');
    return this.galleryRepo.findOneBy({ id });
  }

  async remove(id: string) {
    const galleryItem = await this.galleryRepo.findOneBy({ id });
    if (galleryItem && galleryItem.imageUrl) {
      const filePath = path.join(
        process.cwd(),
        'uploads',
        galleryItem.imageUrl,
      );
      if (fs.existsSync(filePath)) {
        try {
          fs.unlinkSync(filePath);
        } catch (err) {
          console.error('Error deleting gallery image:', err);
        }
      }
    }
    const result = await this.galleryRepo.delete(id);
    await this.cacheManager.del('all_gallery');
    return result;
  }

  async getCategories() {
    return await this.galleryRepo
      .createQueryBuilder('gallery')
      .select('gallery.category')
      .distinct(true)
      .where('gallery.category IS NOT NULL AND gallery.category != :empty', {
        empty: '',
      })
      .getRawMany()
      .then((results) =>
        results.map((r) => r.gallery_category).filter(Boolean),
      );
  }

  async countAll() {
    return this.galleryRepo.count();
  }
}
