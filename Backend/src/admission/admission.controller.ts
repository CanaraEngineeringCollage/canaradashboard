import { Controller, Get, Post, Body, Query, UseGuards } from '@nestjs/common';
import { AdmissionService } from './admission.service';
import { CreateAdmissionEnquiryDto } from './dto/create-admission-enquiry.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admission-enquiries')
export class AdmissionController {
  constructor(private readonly admissionService: AdmissionService) {}

  @Post()
  create(@Body() createAdmissionEnquiryDto: CreateAdmissionEnquiryDto) {
    return this.admissionService.create(createAdmissionEnquiryDto);
  }

  @UseGuards(JwtAuthGuard)
  @Get()
  findAll(@Query('page') page: number = 1, @Query('limit') limit: number = 10) {
    return this.admissionService.findAll(page, limit);
  }

  @UseGuards(JwtAuthGuard)
  @Get('count')
  async count() {
    const count = await this.admissionService.countAll();
    return { count };
  }
}
