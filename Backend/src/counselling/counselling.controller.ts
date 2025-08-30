import { Controller, Get, Post, Body, UseGuards } from '@nestjs/common';
import { CounsellingService } from './counselling.service';
import { CreateCounsellingDto } from './dto/counselling.dto';



@Controller('counselling')
export class CounsellingController {
  constructor(private readonly counsellingService: CounsellingService) {}

  @Post()
  async create(@Body() body: CreateCounsellingDto) {
    return this.counsellingService.create(body);
  }

  @Get()
  async findAll() {
    return this.counsellingService.findAll();
  }
}
