import { Injectable, NotFoundException } from '@nestjs/common';
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
  ) {}

  // 1. CREATE
  async create(dto: CreateGalleryDto, imageFile: Express.Multer.File) {
    const gallery = this.galleryRepo.create({
      ...dto,
      image: `/uploads/${imageFile.filename}`,
    });
    return this.galleryRepo.save(gallery);
  }

  // 2. FIND ALL (with Pagination & Filtering)
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

  // 3. FIND ONE
  async findOne(id: string) {
    const gallery = await this.galleryRepo.findOneBy({ id });
    if (!gallery) return null;
    return gallery;
  }

  // 4. UPDATE
  async update(id: string, dto: UpdateGalleryDto, file?: Express.Multer.File) {
    const existing = await this.galleryRepo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Gallery item not found');

    const updatedData: any = { ...dto };

    if (file) {
      updatedData.image = `/uploads/${file.filename}`;
    }

    await this.galleryRepo.update(id, updatedData);
    return this.galleryRepo.findOneBy({ id });
  }

  // 5. REMOVE
  async remove(id: string) {
    return this.galleryRepo.delete(id);
  }

  // 6. GET CATEGORIES
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
  // 7. COUNT ALL
  async countAll() {
    return this.galleryRepo.count();
  }
}
