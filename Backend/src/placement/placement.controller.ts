import { Controller, Get, Post, Body, Query } from '@nestjs/common';
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
  findAll(
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
  ) {
    return this.placementService.findAll(+page, +limit);
  }
  @UseGuards(JwtAuthGuard)
  @Get('count')
  async getCount() {
    const count = await this.placementService.count();
    return { count };
  }
}
