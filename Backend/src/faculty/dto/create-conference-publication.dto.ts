import { IsString, IsOptional } from 'class-validator';

export class CreateConferencePublicationDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  conferenceName: string;

  @IsString()
  conferenceDate: string;

  @IsOptional()
  @IsString()
  location?: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  publisher?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsOptional()
  @IsString()
  pageNumbers?: string;
}
