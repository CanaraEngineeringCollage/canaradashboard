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

  async findAll() {
    return this.facultyRepository.find({
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
    });
  }

async getTotalCount() {
  return await this.facultyRepository.count();
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