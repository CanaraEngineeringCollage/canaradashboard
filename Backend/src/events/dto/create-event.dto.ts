import { IsString } from 'class-validator';

export class CreateEventDto {
  @IsString()
  title: string;

  @IsString()
  tagline: string;

  @IsString()
  date: string;

  @IsString()
  description: string;
}
