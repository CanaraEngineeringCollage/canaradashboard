import { IsString, IsEnum, IsOptional, ValidateNested, IsArray } from 'class-validator';
import { Type } from 'class-transformer';
import { CreateQualificationDto } from './create-qualification.dto';
import { CreatePatentDto } from './create-patent.dto';
import { CreateBookChapterDto } from './create-book-chapter.dto';
import { CreateCertificationDto } from './create-certification.dto';
import { CreateJournalPublicationDto } from './create-journal-publication.dto';
import { CreateConferencePublicationDto } from './create-conference-publication.dto';

export enum EmploymentType {
  FullTime = 'FullTime',
  PartTime = 'PartTime',
  Contract = 'Contract',
}

export class CreateFacultyDto {
  @IsString()
  name: string;

  @IsString()
  designation: string;

  @IsString()
  department: string;

  @IsString()
  joiningDate: string;

  @IsString()
  experience: string;

  @IsEnum(EmploymentType)
  employmentType: EmploymentType;

  @IsOptional()
  @IsString()
  avatar?: string;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQualificationDto)
  qualifications: CreateQualificationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePatentDto)
  patents: CreatePatentDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookChapterDto)
  bookChapters: CreateBookChapterDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications: CreateCertificationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalPublicationDto)
  internationalJournalPublications: CreateJournalPublicationDto[];

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConferencePublicationDto)
  internationalConferencePublications: CreateConferencePublicationDto[];
}
