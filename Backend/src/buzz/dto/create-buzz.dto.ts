import { IsString, IsNotEmpty, IsObject } from 'class-validator';
import { Type } from 'class-transformer';

export class CreateBuzzDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsObject()
  @IsNotEmpty()
  @Type(() => Object)
  design: object;
}
