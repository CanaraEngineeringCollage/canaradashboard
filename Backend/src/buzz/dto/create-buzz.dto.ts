import {
  IsString,
  IsNotEmpty,
  IsObject,
  IsIn,
  IsDateString,
  IsOptional,
} from 'class-validator';
import { Type, Transform } from 'class-transformer';

export class CreateBuzzDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  design: object;

  @IsString()
  @IsNotEmpty()
  @IsIn([
    'Sports',
    'Fest',
    'Academics',
    'Cultural Events',
    'Technical Events',
    'Exams',
    'CSR',
    'Alumni',
    'Career Guidance',
    'Student Achievements',
    'Weekly Digest',
  ])
  category: string;

  @IsString()
  @IsNotEmpty()
  eventName: string;

  @IsOptional()
  weeklyDigest?: any;

  @IsOptional()
  @IsDateString()
  @Transform(({ value }) => (value === '' ? null : value))
  eventDate?: string;
}
