import { Controller, Post, Get, Body, UseGuards } from '@nestjs/common';
import { ScstGrievanceService } from './scst-grievance.service';
import { CreateScstGrievanceDto } from './dto/create-scst-grievance.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('scst-grievances')
export class ScstGrievanceController {
  constructor(private readonly scstService: ScstGrievanceService) {}

  @Post()
  async create(@Body() dto: CreateScstGrievanceDto) {
    return this.scstService.create(dto);
  }
  // @UseGuards(JwtAuthGuard)
  @Get()
  async findAll() {
    return this.scstService.findAll();
  }
}
