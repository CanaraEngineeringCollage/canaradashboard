import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAcademicCalendarDto {
  @IsString()
  @IsNotEmpty()
  year: string;

  @IsString()
  @IsNotEmpty()
  department: string;
}
