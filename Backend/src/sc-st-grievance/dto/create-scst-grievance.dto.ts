import { IsNotEmpty, IsEmail, IsString, Matches } from 'class-validator';

export class CreateScstGrievanceDto {
  @IsNotEmpty()
  @IsString()
  date: string;

  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsString()
  grievance_from: string;

  @IsNotEmpty()
  @Matches(/^[0-9]{10}$/, { message: 'Contact number must be 10 digits' })
  contact_number: string;

  @IsNotEmpty()
  @IsEmail()
  email: string;

  @IsNotEmpty()
  @IsString()
  category: string; // SC / ST / OBC / Other

  @IsNotEmpty()
  @IsString()
  nature_of_grievance: string;
}
