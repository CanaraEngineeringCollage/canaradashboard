import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ScstGrievanceService } from './scst-grievance.service';
import { CreateScstGrievanceDto } from './dto/create-scst-grievance.dto';


@Controller('scst-grievances')
export class ScstGrievanceController {
  constructor(private readonly scstService: ScstGrievanceService) {}

  @Post()
  async create(@Body() dto: CreateScstGrievanceDto) {
    return this.scstService.create(dto);
  }

  @Get()
  async findAll() {
    return this.scstService.findAll();
  }
}
