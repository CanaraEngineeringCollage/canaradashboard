import { IsNotEmpty, IsString, IsUrl } from 'class-validator';

export class UpdatePptDto {
  @IsString()
  @IsUrl()
  @IsNotEmpty()
  link: string;
}


