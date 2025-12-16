// src/faculty/faculty.service.ts
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository, Raw } from 'typeorm';
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

  async create(
    createFacultyDto: CreateFacultyDto,
    avatar?: Express.Multer.File,
  ) {
    const faculty = this.facultyRepository.create(createFacultyDto);
    if (avatar) {
      faculty.avatar = avatar.buffer;
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
  }: {
    department?: string;
    page?: number;
    limit?: number;
    all?: boolean;
    search?: string;
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
      )
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
