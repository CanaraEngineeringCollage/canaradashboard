import { IsString, IsUrl, IsNotEmpty } from 'class-validator';

export class CreateAlumniPodcastDto {
  @IsString()
  @IsNotEmpty()
  url: string;
}
