import { IsString } from 'class-validator';

export class CreateDepartmentHeadDto {
  @IsString()
  isDepartmentHead: string;

  @IsString()
  username: string;

  @IsString()
  password: string;
}
