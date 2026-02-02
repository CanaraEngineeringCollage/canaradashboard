import { PartialType } from '@nestjs/mapped-types';
import { CreateTopRecruiterDto } from './create-top-recruiter.dto';

export class UpdateTopRecruiterDto extends PartialType(CreateTopRecruiterDto) {}
