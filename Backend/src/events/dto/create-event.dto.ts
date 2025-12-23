import { IsIn } from 'class-validator';

export class CreateEventDto {
  title: string;
  // tagline: string;
  description: string;
  date: string;
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
