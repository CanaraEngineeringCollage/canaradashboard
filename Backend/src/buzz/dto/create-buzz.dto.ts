import { IsString, IsNotEmpty, IsObject, IsIn, IsDateString } from 'class-validator';
import { Type } from 'class-transformer';

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
  ])
  category: string;



  @IsDateString()
  @IsNotEmpty()
  eventDate: string;
}
