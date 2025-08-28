// src/alumni/dto/create-alumni.dto.ts
import { IsEmail, IsNotEmpty, IsOptional, MaxLength } from 'class-validator';

export class CreateAlumniDto {
  @IsNotEmpty()
  fullName: string;

  @IsEmail()
  email: string;

  @IsNotEmpty()
  phone: string;

  @IsOptional()
  dateOfBirth?: string;

  @IsOptional()
  usn?: string;

  @IsOptional()
  address?: string;

  @IsOptional()
  @MaxLength(200)
  comments?: string;
}
