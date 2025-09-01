import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCertificationDto {
  @IsString()
  certifications: string;
}
