import { IsString, IsBoolean, IsOptional } from 'class-validator';

export class CreateBookChapterDto {
  @IsString()
  title: string;

  @IsString()
  authors: string;

  @IsString()
  bookTitle: string;

  @IsString()
  publisher: string;

  @IsString()
  publicationYear: string;

  @IsOptional()
  @IsString()
  doi?: string;

  @IsOptional()
  @IsString()
  isbn?: string;

  @IsBoolean()
  scopusIndexed: boolean;

  @IsString()
  pageNumbers: string;
}
