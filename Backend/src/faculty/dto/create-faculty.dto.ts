import {
  IsString,
  IsEmail,
  IsDateString,
  IsEnum,
  IsArray,
  ValidateNested,
  IsOptional,
  IsNotEmpty,
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

export class CreatePatentDto {
  
  @IsString()
  patentData: string;
}

export class CreateBookChapterDto {
  @IsString()
  bookChapterData: string;
}

export class CreateCertificationDto {
  @IsString()
  certifications: string;
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

  @IsEmail()
  email: string;

  @IsDateString()
  joiningDate: string;

  @IsString()
  experience: string;

  @IsEnum(['Regular', 'Contract', 'Visiting'])
  employmentType: 'Regular' | 'Contract' | 'Visiting';

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreateQualificationDto)
  qualifications: CreateQualificationDto[];

  @IsOptional()
  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => CreatePatentDto)
  patents?: CreatePatentDto[];

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
