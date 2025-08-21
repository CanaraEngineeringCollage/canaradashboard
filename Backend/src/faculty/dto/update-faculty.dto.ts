import { PartialType } from '@nestjs/mapped-types';
import { CreateFacultyDto } from './create-faculty.dto';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateFacultyDto extends PartialType(CreateFacultyDto) {
  @IsString()
  @IsNotEmpty()
  name: string; // Ensure name is required and non-empty
}