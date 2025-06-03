import { IsString } from 'class-validator';

export class CreateQualificationDto {
  @IsString()
  degree: string;

  @IsString()
  passingYear: string;

  @IsString()
  college: string;

  @IsString()
  specialization: string;
}
