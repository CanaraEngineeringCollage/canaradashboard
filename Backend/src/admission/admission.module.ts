import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AdmissionService } from './admission.service';
import { AdmissionController } from './admission.controller';
import { AdmissionEnquiry } from './entities/admission-enquiry.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AdmissionEnquiry])],
  controllers: [AdmissionController],
  providers: [AdmissionService],
})
export class AdmissionModule {}
