import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AcademicSyllabus } from './entities/academic-syllabus.entity';
import { CreateAcademicSyllabusDto } from './dto/create-academic-syllabus.dto';
import { UpdateAcademicSyllabusDto } from './dto/update-academic-syllabus.dto';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class AcademicSyllabusService {
  constructor(
    @InjectRepository(AcademicSyllabus)
    private readonly repo: Repository<AcademicSyllabus>,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  async create(
    createDto: CreateAcademicSyllabusDto,
    file: Express.Multer.File,
  ) {
    let filename: string | undefined = undefined;

    if (file) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, extension)
        .replace(/[^a-zA-Z0-9-]/g, '-');
      filename = `${baseName}-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
    }

    const syllabus = this.repo.create({
      ...createDto,
      pdfUrl: filename,
    });
    const savedSyllabus = await this.repo.save(syllabus);
    await this.cacheManager.del('all_academic_syllabus');
    return savedSyllabus;
  }

  async findAll(
    page: number,
    limit: number,
    department?: string,
    category?: string,
  ) {
    const queryBuilder = this.repo.createQueryBuilder('syllabus');

    if (department) {
      queryBuilder.andWhere('syllabus.department = :department', {
        department,
      });
    }

    if (category) {
      queryBuilder.andWhere('syllabus.category = :category', { category });
    }

    queryBuilder.orderBy('syllabus.createdAt', 'DESC');
    queryBuilder.skip((page - 1) * limit);
    queryBuilder.take(limit);

    const [data, total] = await queryBuilder.getManyAndCount();

    return {
      data,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit),
    };
  }

  async findOne(id: number) {
    const entry = await this.repo.findOne({ where: { id } });
    if (!entry) {
      throw new NotFoundException('Academic Syllabus/Scheme not found');
    }
    return entry;
  }

  async update(
    id: number,
    updateDto: UpdateAcademicSyllabusDto,
    file?: Express.Multer.File,
  ) {
    const entry = await this.findOne(id);

    if (file) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      if (!fs.existsSync(uploadDir)) {
        fs.mkdirSync(uploadDir, { recursive: true });
      }

      if (entry.pdfUrl) {
        const oldFile = path.join(uploadDir, entry.pdfUrl);
        if (fs.existsSync(oldFile)) {
          try {
            fs.unlinkSync(oldFile);
          } catch (e) {
            console.error('Failed to delete older syllabus file', e);
          }
        }
      }

      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      const baseName = path
        .basename(file.originalname, extension)
        .replace(/[^a-zA-Z0-9-]/g, '-');
      const filename = `${baseName}-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
      entry.pdfUrl = filename;
    }

    Object.assign(entry, updateDto);
    const updatedEntry = await this.repo.save(entry);
    await this.cacheManager.del('all_academic_syllabus');
    return updatedEntry;
  }

  async remove(id: number) {
    const entry = await this.findOne(id);
    if (entry.pdfUrl) {
      const uploadDir = path.join(process.cwd(), 'uploads');
      const oldFile = path.join(uploadDir, entry.pdfUrl);
      if (fs.existsSync(oldFile)) {
        try {
          fs.unlinkSync(oldFile);
        } catch (e) {
          console.error('Failed to delete syllabus file', e);
        }
      }
    }
    const removedEntry = await this.repo.remove(entry);
    await this.cacheManager.del('all_academic_syllabus');
    return removedEntry;
  }
}
