import { IsString, IsOptional } from 'class-validator';

export class CreateJournalPublicationDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  journalName: string;

  @IsString()
  publicationDate: string;

  @IsString()
  volume: string;

  @IsOptional()
  @IsString()
  issue?: string;

  @IsString()
  pageNumbers: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  issn?: string;

  @IsOptional()
  @IsString()
  indexing?: string;
}
