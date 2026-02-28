import { PartialType } from '@nestjs/mapped-types';
import { CreateAcademicSyllabusDto } from './create-academic-syllabus.dto';


export class UpdateAcademicSyllabusDto extends PartialType(
  CreateAcademicSyllabusDto,
) {}
