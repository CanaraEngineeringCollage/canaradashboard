import { IsNotEmpty, IsOptional, IsString, IsDateString } from 'class-validator';

export class CreateEventDto {
  @IsNotEmpty()
  @IsString()
  title: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsOptional()
  @IsString()
  imageUrl?: string;

  @IsNotEmpty()
  @IsDateString()
  eventDate: string;

  @IsNotEmpty()
  @IsString()
  category: string;
}
