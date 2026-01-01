import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { AdmissionEnquiry } from './entities/admission-enquiry.entity';
import { CreateAdmissionEnquiryDto } from './dto/create-admission-enquiry.dto';

@Injectable()
export class AdmissionService {
  constructor(
    @InjectRepository(AdmissionEnquiry)
    private admissionRepository: Repository<AdmissionEnquiry>,
  ) {}

  async create(
    createAdmissionEnquiryDto: CreateAdmissionEnquiryDto,
  ): Promise<AdmissionEnquiry> {
    const enquiry = this.admissionRepository.create(createAdmissionEnquiryDto);
    return this.admissionRepository.save(enquiry);
  }

  async findAll(
    page: number = 1,
    limit: number = 10,
  ): Promise<{ data: AdmissionEnquiry[]; total: number }> {
    const [data, total] = await this.admissionRepository.findAndCount({
      skip: (page - 1) * limit,
      take: limit,
      order: { createdAt: 'DESC' },
    });
    return { data, total };
  }

  async countAll(): Promise<number> {
    return this.admissionRepository.count();
  }
}
