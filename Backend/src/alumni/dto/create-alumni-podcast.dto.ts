import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateAlumniPodcastDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  url: string;
}
