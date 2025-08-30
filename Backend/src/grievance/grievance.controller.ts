import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { GrievanceService } from './grievance.service';
import { CreateGrievanceDto } from './dto/create-grievance.dto';

@Controller('grievances')
export class GrievanceController {
  constructor(private readonly grievanceService: GrievanceService) {}

  @Post()
  async create(@Body() createGrievanceDto: CreateGrievanceDto) {
    return this.grievanceService.create(createGrievanceDto);
  }
  @Get()
  async findAll() {
    return this.grievanceService.findAll();
  }
}
