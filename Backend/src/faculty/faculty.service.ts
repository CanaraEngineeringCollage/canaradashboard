// src/faculty/faculty.service.ts
import {
  Injectable,
  NotFoundException,
  BadRequestException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw, MoreThanOrEqual } from 'typeorm';
import { Faculty } from './entities/faculty.entity';
import { JournalPublication } from './entities/journal-publication.entity';
import { ConferencePublication } from './entities/conference-publication.entity';
import { BookChapter } from './entities/book-chapter.entity';
import { Certification } from './entities/certification.entity';
import { Achievement } from './entities/patent.entity';
import { CreateFacultyDto } from './dto/create-faculty.dto';
import { UpdateFacultyDto } from './dto/update-faculty.dto';

import * as XLSX from 'xlsx';

@Injectable()
export class FacultyService {
  constructor(
    @InjectRepository(Faculty)
    private readonly facultyRepository: Repository<Faculty>,
    @InjectRepository(JournalPublication)
    private readonly journalRepo: Repository<JournalPublication>,
    @InjectRepository(ConferencePublication)
    private readonly conferenceRepo: Repository<ConferencePublication>,
    @InjectRepository(BookChapter)
    private readonly bookChapterRepo: Repository<BookChapter>,
    @InjectRepository(Certification)
    private readonly certificationRepo: Repository<Certification>,
    @InjectRepository(Achievement)
    private readonly achievementRepo: Repository<Achievement>,
  ) {}

  /**
   * Shift priorities down to make space for a new priority.
   * Increments the priority of all faculties in the department with priority >= startPriority.
   */
  private async shiftPriorities(department: string, startPriority: number) {
    await this.facultyRepository
      .createQueryBuilder()
      .update(Faculty)
      .set({ priority: () => 'priority + 1' })
      .where('department = :department', { department })
      .andWhere('priority >= :startPriority', { startPriority })
      .execute();
  }

  private async shiftKeyFunctionaryPriorities(startPriority: number) {
    await this.facultyRepository
      .createQueryBuilder()
      .update(Faculty)
      .set({ keyFunctionaryPriority: () => 'keyFunctionaryPriority + 1' })
      .where('isKeyFunctionary = :isKeyFunctionary', { isKeyFunctionary: true })
      .andWhere('keyFunctionaryPriority >= :startPriority', { startPriority })
      .execute();
  }

  private async shiftHodPriorities(startPriority: number) {
    await this.facultyRepository
      .createQueryBuilder()
      .update(Faculty)
      .set({ hodPriority: () => 'hodPriority + 1' })
      .where('isHod = :isHod', { isHod: true })
      .andWhere('hodPriority >= :startPriority', { startPriority })
      .execute();
  }

  async create(
    createFacultyDto: CreateFacultyDto,
    avatar?: Express.Multer.File,
  ) {
    if (createFacultyDto.priority) {
      await this.shiftPriorities(
        createFacultyDto.department,
        createFacultyDto.priority,
      );
    }

    if (
      createFacultyDto.isKeyFunctionary &&
      createFacultyDto.keyFunctionaryPriority
    ) {
      await this.shiftKeyFunctionaryPriorities(
        createFacultyDto.keyFunctionaryPriority,
      );
    }

    if (createFacultyDto.isHod) {
      const existingHod = await this.facultyRepository.findOne({
        where: {
          department: createFacultyDto.department,
          isHod: true,
        },
      });

      if (existingHod) {
        throw new BadRequestException(
          `An HOD already exists for the department ${createFacultyDto.department}`,
        );
      }

      if (createFacultyDto.hodPriority) {
        await this.shiftHodPriorities(createFacultyDto.hodPriority);
      }
    }

    const faculty = this.facultyRepository.create(createFacultyDto);
    if (avatar) {
      faculty.avatar = `/uploads/${avatar.filename}`;
    }
    return this.facultyRepository.save(faculty);
  }

  async importFacultyData(file: Express.Multer.File) {
    // 1. Parse Excel File
    const workbook = XLSX.read(file.buffer, { type: 'buffer' });
    const sheetName = workbook.SheetNames[0]; // Assume data is in the first sheet
    const sheet = workbook.Sheets[sheetName];
    const data = XLSX.utils.sheet_to_json(sheet);

    const report = {
      totalProcessed: 0,
      success: 0,
      failed: 0,
      errors: [] as string[],
    };

    // 2. Iterate through every row (every faculty member)
    for (const row of data as any[]) {
      report.totalProcessed++;
      const name = row['Name']?.trim();

      // Skip empty rows
      if (!name) continue;

      try {
        // 3. Find Faculty (Case Insensitive Match with name normalization)
        // Normalize the name from Excel (remove prefixes like "Dr", "Prof", etc.)
        const normalizedName = this.normalizeName(name);

        // Get all faculties to compare normalized names
        // Note: We fetch all because we need to normalize database names too
        // For better performance with large datasets, consider adding a normalized_name column
        const allFaculties = await this.facultyRepository.find();

        // Find faculty by comparing normalized names (case insensitive)
        const faculty = allFaculties.find((f) => {
          const dbNormalizedName = this.normalizeName(f.name);
          return (
            dbNormalizedName.toLowerCase() === normalizedName.toLowerCase()
          );
        });

        if (!faculty) {
          report.failed++;
          report.errors.push(
            `Skipped: Faculty '${name}' (normalized: '${normalizedName}') not found in database.`,
          );
          continue;
        }

        // 4. Parse the JSON strings from the Scraper
        const rawAchievements = this.safeJsonParse(row['achievements']);
        const rawBookChapters = this.safeJsonParse(row['bookChapters']);
        const rawCertifications = this.safeJsonParse(row['certifications']);

        // 5. Direct mapping: Each column goes directly to its corresponding table

        // Process Achievements column → Achievements table
        for (const item of rawAchievements) {
          const heading = item.heading || '';
          const descriptions = item.descriptions || [];

          if (!heading || descriptions.length === 0) continue;

          await this.achievementRepo.save(
            this.achievementRepo.create({
              heading: heading,
              descriptions: descriptions,
              faculty: faculty,
            }),
          );
        }

        // Process Book Chapters column → Book Chapters table
        for (const item of rawBookChapters) {
          const heading = item.heading || '';
          const descriptions = item.descriptions || [];

          if (!heading || descriptions.length === 0) continue;

          await this.bookChapterRepo.save(
            this.bookChapterRepo.create({
              heading: heading,
              descriptions: descriptions,
              faculty: faculty,
            }),
          );
        }

        // Process Certifications column → Certifications table
        for (const item of rawCertifications) {
          const heading = item.heading || '';
          const descriptions = item.descriptions || [];

          if (!heading || descriptions.length === 0) continue;

          await this.certificationRepo.save(
            this.certificationRepo.create({
              heading: heading,
              descriptions: descriptions,
              faculty: faculty,
            }),
          );
        }

        report.success++;
        // console.log(`Successfully updated: ${faculty.name}`);
      } catch (error) {
        report.failed++;
        report.errors.push(`Error processing '${name}': ${error.message}`);
      }
    }

    return report;
  }

  /**
   * Helper to safely parse JSON strings from Excel.
   * Handles "N/A" or malformed strings gracefully.
   */
  private safeJsonParse(jsonString: string): any[] {
    if (!jsonString || jsonString === 'N/A') return [];
    try {
      return JSON.parse(jsonString);
    } catch (e) {
      return [];
    }
  }

  /**
   * Normalize name by removing common prefixes/titles, dots, and extra spaces.
   * Examples: "Dr.  Jamshad" -> "Jamshad", "Prof. John  Doe" -> "John Doe"
   */
  private normalizeName(name: string): string {
    if (!name) return '';

    // Common prefixes/titles to remove (case insensitive)
    const prefixes = [
      'dr',
      'dr.',
      'doctor',
      'prof',
      'prof.',
      'professor',
      'mr',
      'mr.',
      'mister',
      'mrs',
      'mrs.',
      'missus',
      'ms',
      'ms.',
      'miss',
      'sir',
      'madam',
      'mr.',
      'mrs.',
      'ms.',
    ];

    // Trim and remove leading prefixes
    let normalized = name.trim();
    for (const prefix of prefixes) {
      const regex = new RegExp(`^${prefix}\\.?\\s+`, 'i');
      normalized = normalized.replace(regex, '');
    }

    // Remove dots/commas and collapse multiple spaces
    normalized = normalized.replace(/[.,]/g, ' ');
    normalized = normalized.replace(/\s+/g, ' ');

    return normalized.trim();
  }

  async findAll({
    department,
    page,
    limit,
    all,
    search,
    keyFunctionary,
    hod,
  }: {
    department?: string;
    page?: number;
    limit?: number;
    all?: boolean;
    search?: string;
    keyFunctionary?: boolean;
    hod?: boolean;
  }) {
    const query = this.facultyRepository
      .createQueryBuilder('faculty')
      .leftJoinAndSelect('faculty.qualifications', 'qualifications')
      .leftJoinAndSelect('faculty.achievements', 'achievements')
      .leftJoinAndSelect('faculty.bookChapters', 'bookChapters')
      .leftJoinAndSelect('faculty.certifications', 'certifications')
      .leftJoinAndSelect(
        'faculty.internationalJournalPublications',
        'internationalJournalPublications',
      )
      .leftJoinAndSelect(
        'faculty.internationalConferencePublications',
        'internationalConferencePublications',
      );

    if (keyFunctionary) {
      query.andWhere('faculty.isKeyFunctionary = :isKeyFunctionary', {
        isKeyFunctionary: true,
      });
      query.orderBy('faculty.keyFunctionaryPriority', 'ASC');
    } else {
      query.orderBy('faculty.createdAt', 'DESC');
    }

    if (hod) {
      // Filter by isHod flag
      query.andWhere('faculty.isHod = :isHod', { isHod: true });
      query.orderBy('faculty.hodPriority', 'ASC');
    }

    if (department) {
      query.andWhere('faculty.department = :department', { department });
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
    const faculties = await this.facultyRepository.find({
      select: ['department'],
    });
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

  async update(
    id: string,
    updateFacultyDto: UpdateFacultyDto,
    avatar?: Express.Multer.File,
  ) {
    const faculty = await this.findOne(id);
    if (!faculty) {
      throw new NotFoundException(`Faculty with ID ${id} not found`);
    }

    // Shift priorities if priority is being updated and is different
    if (
      updateFacultyDto.priority !== undefined &&
      updateFacultyDto.priority !== null &&
      updateFacultyDto.priority !== faculty.priority
    ) {
      const department = updateFacultyDto.department || faculty.department;
      await this.shiftPriorities(department, updateFacultyDto.priority);
    }

    // Shift Key Functionary priorities if priority is updated
    // Check if the user is or becomes a Key Functionary
    const isKeyFunctionary =
      updateFacultyDto.isKeyFunctionary ?? faculty.isKeyFunctionary;

    if (
      isKeyFunctionary &&
      updateFacultyDto.keyFunctionaryPriority !== undefined &&
      updateFacultyDto.keyFunctionaryPriority !== null &&
      updateFacultyDto.keyFunctionaryPriority !== faculty.keyFunctionaryPriority
    ) {
      await this.shiftKeyFunctionaryPriorities(
        updateFacultyDto.keyFunctionaryPriority,
      );
    }

    // Shift HOD priorities if priority is updated
    const isHod = updateFacultyDto.isHod ?? faculty.isHod;

    if (
      isHod &&
      updateFacultyDto.hodPriority !== undefined &&
      updateFacultyDto.hodPriority !== null &&
      updateFacultyDto.hodPriority !== faculty.hodPriority
    ) {
      // Check if trying to set as HOD
      if (isHod) {
        // If the user was NOT HOD before, OR if they are changing departments (unlikely but possible)
        // We need to check if there's already an HOD in the target department
        const targetDepartment =
          updateFacultyDto.department || faculty.department;

        // If 'isHod' is being set to true (or matches existing true), we must check for conflicts
        // We only need to check if we are *changing* the HOD status to true, or if we represent an existing HOD
        // But specifically, if we are saving as isHod=true, no other person in this dept should be HOD.
        // We must exclude ourselves from the check.
        const existingHod = await this.facultyRepository.findOne({
          where: {
            department: targetDepartment,
            isHod: true,
          },
        });

        if (existingHod && existingHod.id !== id) {
          throw new BadRequestException(
            `An HOD already exists for the department ${targetDepartment}`,
          );
        }
      }

      await this.shiftHodPriorities(updateFacultyDto.hodPriority);
    }

    Object.assign(faculty, updateFacultyDto);
    if (avatar) {
      faculty.avatar = `/uploads/${avatar.filename}`;
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
