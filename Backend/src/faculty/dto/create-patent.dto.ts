import { IsString } from 'class-validator';

export class CreatePatentDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  date: string;

  @IsString()
  applicationNumber: string;

  @IsString()
  patentOffice: string;

  @IsString()
  status: string;

  @IsString()
  reference: string;
}
