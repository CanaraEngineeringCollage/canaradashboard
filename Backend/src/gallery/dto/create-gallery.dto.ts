import { IsNotEmpty, IsString } from 'class-validator';

export class CreateGalleryDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  category: string;
}
