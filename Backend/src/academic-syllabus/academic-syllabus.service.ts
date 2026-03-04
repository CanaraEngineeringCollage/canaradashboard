import { Injectable, NotFoundException } from '@nestjs/common';
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
      const prefix =
        createDto.category === 'Scheme'
          ? 'academic-scheme'
          : createDto.category === 'Curriculum'
            ? 'academic-curriculum'
            : 'academic-syllabus';
      filename = `${prefix}-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
    }

    const syllabus = this.repo.create({
      ...createDto,
      pdfUrl: filename,
    });
    return await this.repo.save(syllabus);
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
      const category = updateDto.category || entry.category;
      const prefix =
        category === 'Scheme'
          ? 'academic-scheme'
          : category === 'Curriculum'
            ? 'academic-curriculum'
            : 'academic-syllabus';
      const filename = `${prefix}-${uniqueSuffix}${extension}`;
      const uploadPath = path.join(uploadDir, filename);

      fs.writeFileSync(uploadPath, file.buffer);
      entry.pdfUrl = filename;
    }

    Object.assign(entry, updateDto);
    return await this.repo.save(entry);
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
    return await this.repo.remove(entry);
  }
}
