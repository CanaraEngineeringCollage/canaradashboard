import { IsString, IsNotEmpty } from 'class-validator';

export class CreateAcademicCalendarDto {
  @IsString()
  @IsNotEmpty()
  title: string;
}
