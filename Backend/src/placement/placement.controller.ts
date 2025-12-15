import { Controller, Get, Post, Body } from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';
import { UseGuards } from '@nestjs/common';
@Controller('placement')
export class PlacementController {
  constructor(private readonly placementService: PlacementService) {}

  @Post()

  create(@Body() createPlacementDto: CreatePlacementDto) {
    return this.placementService.create(createPlacementDto);
  }

 @UseGuards(JwtAuthGuard)
  @Get()
 
  findAll() {
    return this.placementService.findAll();
  }
}
