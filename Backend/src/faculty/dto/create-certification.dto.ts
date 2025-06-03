import { IsString, IsOptional, IsUrl } from 'class-validator';

export class CreateCertificationDto {
  @IsString()
  name: string;

  @IsString()
  issuingOrganization: string;

  @IsString()
  issueDate: string;

  @IsOptional()
  @IsString()
  expiryDate?: string;

  @IsString()
  credentialId: string;

  @IsOptional()
  @IsUrl()
  credentialUrl?: string;

  @IsOptional()
  @IsString()
  credits?: string;
}
