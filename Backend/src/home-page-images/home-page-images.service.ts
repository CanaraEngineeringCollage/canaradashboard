import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import * as fs from 'fs';
import * as path from 'path';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { HomePageImage } from './entities/home-page-image.entity';
import { CreateHomePageImageDto } from './dto/create-home-page-image.dto';

@Injectable()
export class HomePageImagesService {
  constructor(
    @InjectRepository(HomePageImage)
    private repo: Repository<HomePageImage>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(
    dto: CreateHomePageImageDto,
    imageFile: Express.Multer.File,
    mobileImageFile: Express.Multer.File,
  ) {
    if (!imageFile || !mobileImageFile) {
      throw new Error('Both desktop and mobile images are required');
    }

    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }

    const uniqueSuffixDesktop =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extDesktop = path.extname(imageFile.originalname);
    const filenameDesktop = `home-image-${uniqueSuffixDesktop}${extDesktop}`;
    fs.writeFileSync(path.join(uploadDir, filenameDesktop), imageFile.buffer);

    const uniqueSuffixMobile =
      Date.now() + '-' + Math.round(Math.random() * 1e9);
    const extMobile = path.extname(mobileImageFile.originalname);
    const filenameMobile = `home-mobile-${uniqueSuffixMobile}${extMobile}`;
    fs.writeFileSync(
      path.join(uploadDir, filenameMobile),
      mobileImageFile.buffer,
    );

    const image = this.repo.create({
      ...dto,
      imageUrl: filenameDesktop,
      mobileImageUrl: filenameMobile,
    });
    const savedImage = await this.repo.save(image);
    await this.cacheManager.del('all_home_page_images');
    return savedImage;
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
    const image = await this.repo.findOneBy({ id });
    if (image) {
      if (image.imageUrl) {
        const fileDesktop = path.join(process.cwd(), 'uploads', image.imageUrl);
        if (fs.existsSync(fileDesktop)) {
          try {
            fs.unlinkSync(fileDesktop);
          } catch (err) {
            console.error('Error deleting desktop image:', err);
          }
        }
      }
      if (image.mobileImageUrl) {
        const fileMobile = path.join(
          process.cwd(),
          'uploads',
          image.mobileImageUrl,
        );
        if (fs.existsSync(fileMobile)) {
          try {
            fs.unlinkSync(fileMobile);
          } catch (err) {
            console.error('Error deleting mobile image:', err);
          }
        }
      }
    }
    const result = await this.repo.delete(id);
    await this.cacheManager.del('all_home_page_images');
    return result;
  }
}
