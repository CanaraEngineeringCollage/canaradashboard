import { IsString, IsNotEmpty, IsObject, IsIn, IsDateString, IsOptional } from 'class-validator';
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
  
  @IsString()
  @IsNotEmpty()
  eventName: string;



  @IsOptional()
  @IsDateString()
  eventDate?: string;
}
