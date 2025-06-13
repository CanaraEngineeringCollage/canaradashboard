import { Injectable, ConflictException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Faculty } from './entities/faculty.entity';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import * as bcrypt from 'bcrypt';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private facultyRepository: Repository<Faculty>,
  ) {}

  async createFaculty(facultyData: CreateFacultyDto): Promise<Faculty> {
    // Check if faculty is department head
    if (facultyData.isDepartmentHead) {
      // Check if department already has a head
      const existingHead = await this.facultyRepository.findOne({
        where: {
          department: facultyData.department,
          isDepartmentHead: true,
        },
      });

      if (existingHead) {
        throw new ConflictException(`Department ${facultyData.department} already has a head`);
      }

      // Hash password for department head
      if (facultyData.password) {
        const salt = await bcrypt.genSalt();
        facultyData.password = await bcrypt.hash(facultyData.password, salt);
      }
    }

    const faculty = this.facultyRepository.create(facultyData);
    return this.facultyRepository.save(faculty);
  }

  async updateFaculty(id: string, facultyData: Partial<CreateFacultyDto>): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({ where: { id } });
    if (!faculty) {
      throw new Error('Faculty not found');
    }

    // Check if faculty is being made department head
    if (facultyData.isDepartmentHead && !faculty.isDepartmentHead) {
      // Check if department already has a head
      const existingHead = await this.facultyRepository.findOne({
        where: {
          department: facultyData.department || faculty.department,
          isDepartmentHead: true,
        },
      });

      if (existingHead && existingHead.id !== id) {
        throw new ConflictException(`Department ${facultyData.department || faculty.department} already has a head`);
      }

      // Hash password for department head
      if (facultyData.password) {
        const salt = await bcrypt.genSalt();
        facultyData.password = await bcrypt.hash(facultyData.password, salt);
      }
    }

    // If faculty is no longer department head, remove credentials
    if (faculty.isDepartmentHead && facultyData.isDepartmentHead === false) {
      facultyData.username = undefined;
      facultyData.password = undefined;
    }

    Object.assign(faculty, facultyData);
    return this.facultyRepository.save(faculty);
  }

  async deleteFaculty(id: string): Promise<void> {
    const result = await this.facultyRepository.delete(id);
    if (result.affected === 0) {
      throw new Error('Faculty not found');
    }
  }

  async getAllFaculty(): Promise<Faculty[]> {
    return this.facultyRepository.find();
  }

  async findByDepartment(department: string): Promise<Faculty[]> {
    return this.facultyRepository.find({
      where: { department },
    });
  }

  async findDepartmentHead(department: string): Promise<Faculty | null> {
    return this.facultyRepository.findOne({
      where: {
        department,
        isDepartmentHead: true,
      },
    });
  }

  async validateDepartmentHead(username: string, password: string): Promise<Faculty> {
    const faculty = await this.facultyRepository.findOne({
      where: {
        username,
        isDepartmentHead: true,
      },
    });

    if (!faculty || !faculty.password) {
      throw new UnauthorizedException('Invalid credentials');
    }

    const isPasswordValid = await bcrypt.compare(password, faculty.password);
    if (!isPasswordValid) {
      throw new UnauthorizedException('Invalid credentials');
    }

    return faculty;
  }
}
