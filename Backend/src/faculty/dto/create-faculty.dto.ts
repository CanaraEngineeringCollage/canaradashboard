import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
  IsInt,
  IsBoolean,
} from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQualificationDto {
  @IsString()
  degree: string;

  @IsString()
  passingYear: string;

  @IsString()
  college: string;

  @IsString()
  nameOfDigree: string;

  @IsString()
  specialization: string;
}

export class CreateAchievementDto {
  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsArray()
  @IsString({ each: true })
  descriptions: string[];
}

// Updated BookChapter DTO to match frontend interface
export class CreateBookChapterDto {
  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsArray()
  @IsString({ each: true })
  descriptions: string[];
}

// Updated Certification DTO to match frontend interface
export class CreateCertificationDto {
  @IsString()
  @IsNotEmpty()
  heading: string;

  @IsArray()
  @IsString({ each: true })
  descriptions: string[];
}

export class CreateJournalPublicationDto {
  @IsString()
  publicationsData: string;
}

export class CreateConferencePublicationDto {
  @IsString()
  conferencePublications: string;
}

export class CreateFacultyDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsString()
  designation: string;

  @IsString()
  department: string;

  @IsString()
  @IsOptional()
  subDepartment?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  joiningDate: string;

  @IsString()
  experience: string;

  @IsEnum(['Regular', 'Contract', 'Visiting'])
  employmentType: 'Regular' | 'Contract' | 'Visiting';

  @IsEnum(['Teaching Staff', 'Technical Staff'])
  type: 'Teaching Staff' | 'Technical Staff';

  @IsInt()
  @IsOptional()
  @IsInt()
  @IsOptional()
  priority?: number | null;

  @IsBoolean()
  @IsOptional()
  isKeyFunctionary?: boolean;

  @IsString()
  @IsOptional()
  keyFunctionaryName?: string;

  @IsInt()
  @IsOptional()
  keyFunctionaryPriority?: number;

  @IsBoolean()
  @IsOptional()
  isHod?: boolean;

  @IsString()
  @IsOptional()
  hodName?: string;

  @IsInt()
  @IsOptional()
  hodPriority?: number;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQualificationDto)
  qualifications: CreateQualificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAchievementDto)
  achievements?: CreateAchievementDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookChapterDto)
  bookChapters?: CreateBookChapterDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications?: CreateCertificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalPublicationDto)
  internationalJournalPublications?: CreateJournalPublicationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConferencePublicationDto)
  internationalConferencePublications?: CreateConferencePublicationDto[];
}

export class UpdateFacultyDto {
  @IsString()
  @IsOptional()
  name?: string;

  @IsString()
  @IsOptional()
  designation?: string;

  @IsString()
  @IsOptional()
  department?: string;

  @IsString()
  @IsOptional()
  subDepartment?: string;

  @IsEmail()
  @IsOptional()
  email?: string;

  @IsDateString()
  @IsOptional()
  joiningDate?: string;

  @IsString()
  @IsOptional()
  experience?: string;

  @IsEnum(['Regular', 'Contract', 'Visiting'])
  @IsOptional()
  employmentType?: 'Regular' | 'Contract' | 'Visiting';

  @IsEnum(['Teaching Staff', 'Technical Staff'])
  @IsOptional()
  type?: 'Teaching Staff' | 'Technical Staff';

  @IsInt()
  @IsOptional()
  priority?: number | null;

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQualificationDto)
  qualifications?: CreateQualificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateAchievementDto)
  achievements?: CreateAchievementDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateBookChapterDto)
  bookChapters?: CreateBookChapterDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateCertificationDto)
  certifications?: CreateCertificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateJournalPublicationDto)
  internationalJournalPublications?: CreateJournalPublicationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateConferencePublicationDto)
  internationalConferencePublications?: CreateConferencePublicationDto[];
}
