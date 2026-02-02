import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
} from '@nestjs/common';
import { PlacementService } from './placement.service';
import { CreatePlacementDto } from './dto/create-placement.dto';
import { CreateTopRecruiterDto } from './dto/create-top-recruiter.dto';
import { UpdateTopRecruiterDto } from './dto/update-top-recruiter.dto';
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


  @Get('top-recruiters/count')
  async getTopRecruitersCount() {
    const count = await this.placementService.topRecruitersCount();
    return { count };
  }


  @Get('top-recruiters/years')
  async getDistinctYears() {
    return this.placementService.getDistinctYears();
  }

  
  @Get('top-recruiters')
  getTopRecruiters(
    @Query('year') year?: string,
    @Query('page') page: string = '1',
    @Query('limit') limit: string = '10',
    @Query('search') search: string = '',
  ) {
    return this.placementService.getTopRecruiters(year, +page, +limit, search);
  }

  @UseGuards(JwtAuthGuard)
  @Post('top-recruiters')
  createTopRecruiter(@Body() createTopRecruiterDto: CreateTopRecruiterDto) {
    return this.placementService.createTopRecruiter(createTopRecruiterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('top-recruiters/:id')
  updateTopRecruiter(
    @Param('id') id: string,
    @Body() updateTopRecruiterDto: UpdateTopRecruiterDto,
  ) {
    return this.placementService.updateTopRecruiter(+id, updateTopRecruiterDto);
  }

  @UseGuards(JwtAuthGuard)
  @Delete('top-recruiters/:id')
  removeTopRecruiter(@Param('id') id: string) {
    return this.placementService.removeTopRecruiter(+id);
  }
}
