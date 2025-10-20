// src/faculty/faculty.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
  ) {}

  async create(createFacultyDto: CreateFacultyDto, avatar?: Express.Multer.File) {
    const faculty = this.facultyRepository.create(createFacultyDto);
    if (avatar) {
      faculty.avatar = avatar.buffer;
    }
    return this.facultyRepository.save(faculty);
  }

  async findAll({ department, page, limit, all,search }: { department?: string; page?: number; limit?: number; all?: boolean ;search?: string;}) {
    const query = this.facultyRepository.createQueryBuilder('faculty')
      .leftJoinAndSelect('faculty.qualifications', 'qualifications')
      .leftJoinAndSelect('faculty.achievements', 'achievements')
      .leftJoinAndSelect('faculty.bookChapters', 'bookChapters')
      .leftJoinAndSelect('faculty.certifications', 'certifications')
      .leftJoinAndSelect('faculty.internationalJournalPublications', 'internationalJournalPublications')
      .leftJoinAndSelect('faculty.internationalConferencePublications', 'internationalConferencePublications')
      .orderBy('faculty.createdAt', 'DESC');

    if (department) {
      query.where('faculty.department = :department', { department });
    }

     if (search) {
    query.andWhere('faculty.name LIKE :search', { search: `%${search}%` });
  }

    if (all) {
      // Return all records as an array (no pagination)
      return await query.getMany();
    }

    const [faculties, total] = await query
      .skip((page! - 1) * limit!)
      .take(limit!)
      .getManyAndCount();

    return {
      data: faculties,
      total,
      page,
      limit,
      totalPages: Math.ceil(total / limit!),
    };
  }
  async getDepartments(): Promise<string[]> {
    const faculties = await this.facultyRepository.find({ select: ['department'] });
    const departments = Array.from(
      new Set(faculties.map((f) => f.department).filter(Boolean)),
    );
    return departments;
  }
  async findByDepartment(department: string) {
    return this.facultyRepository.find({
      where: { department },
      relations: [
        'qualifications',
        'achievements',
        'bookChapters',
        'certifications',
        'internationalJournalPublications',
        'internationalConferencePublications',
      ],
      order: { createdAt: 'DESC' },
    });
  }

  async getTotalCount(department?: string) {
    if (department) {
      return this.facultyRepository.count({ where: { department } });
    }
    return this.facultyRepository.count();
  }

  async findOne(id: string) {
    return this.facultyRepository.findOne({
      where: { id },
      relations: [
        'qualifications',
        'achievements',
        'bookChapters',
        'certifications',
        'internationalJournalPublications',
        'internationalConferencePublications',
      ],
    });
  }

  async update(id: string, updateFacultyDto: UpdateFacultyDto, avatar?: Express.Multer.File) {
    const faculty = await this.findOne(id);
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }
    Object.assign(faculty, updateFacultyDto);
    if (avatar) {
      faculty.avatar = avatar.buffer;
    }
    return this.facultyRepository.save(faculty);
  }

  async remove(id: string) {
    const faculty = await this.findOne(id);
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }
    return this.facultyRepository.remove(faculty);
  }
}