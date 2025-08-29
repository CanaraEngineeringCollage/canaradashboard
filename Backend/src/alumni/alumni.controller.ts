// src/alumni/alumni.controller.ts
import { Controller, Post, Body, Get, UseGuards } from '@nestjs/common';
import { AlumniService } from './alumni.service';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('alumni')
export class AlumniController {
  constructor(private readonly alumniService: AlumniService) {}

  @Post()
  create(@Body() data: CreateAlumniDto) {
    return this.alumniService.create(data);
  }
// @UseGuards(JwtAuthGuard)
  @Get()
  findAll() {
    return this.alumniService.findAll();
  }
}
