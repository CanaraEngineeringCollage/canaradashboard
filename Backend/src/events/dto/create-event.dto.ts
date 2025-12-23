import { IsIn, IsOptional } from 'class-validator';
import { Transform } from 'class-transformer';

export class CreateEventDto {
  title: string;
  // tagline: string;
  description: string;
  @IsOptional()
  @Transform(({ value }) => value === "" ? null : value)
  date?: string;
  image: string;

  @IsIn([
    'Computer Science & Engineering',
    'Information Science & Engineering',
    'Electronics & Communication Engineering',
    'Computer Science & Design',
    'Computer Science & Business System',
    'Artificial Intelligence & Machine Learning',
    'Mechanical Engineering',
    'Science & Humanities',
    'Student Welfare Department',
    'Alumni',
    'College Event',
  ])
  category: string; 
}
