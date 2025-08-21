import { IsString, IsEmail, IsDateString, IsEnum, IsArray, ValidateNested, IsOptional, IsNotEmpty } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateQualificationDto {
  @IsString()
  degree: string;

  @IsString()
  passingYear: string;

  @IsString()
  college: string;

  @IsString()
  specialization: string;
}

export class CreatePatentDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsDateString()
  date: string;

  @IsString()
  applicationNumber: string;

  @IsOptional()
  @IsString()
  patentOffice?: string;

  @IsOptional()
  @IsString()
  status?: string;

  @IsOptional()
  @IsString()
  reference?: string;
}

export class CreateBookChapterDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  bookTitle: string;

  @IsString()
  publisher: string;

  @IsOptional()
  @IsString()
  publicationYear?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  scopusIndexed?: boolean;

  @IsOptional()
  @IsString()
  pageNumbers?: string;
}

export class CreateCertificationDto {
  @IsString()
  name: string;

  @IsString()
  issuingOrganization: string;

  @IsDateString()
  issueDate: string;

  @IsOptional()
  @IsDateString()
  expiryDate?: string;

  @IsOptional()
  @IsString()
  credentialId?: string;

  @IsOptional()
  @IsString()
  credentialUrl?: string;

  @IsOptional()
  @IsString()
  credits?: string;
}

export class CreateJournalPublicationDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  journalName: string;

  @IsOptional()
  @IsDateString()
  publicationDate?: string;

  @IsOptional()
  @IsString()
  volume?: string;

  @IsOptional()
  @IsString()
  issue?: string;

  @IsOptional()
  @IsString()
  pageNumbers?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  issn?: string;

  @IsOptional()
  @IsString()
  indexing?: string;
}

export class CreateConferencePublicationDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  conferenceName: string;

  @IsOptional()
  @IsDateString()
  conferenceDate?: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsString()
  pageNumbers?: string;
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