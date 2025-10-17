import { Body, Controller, Get, Post, Patch, Delete, Param, UseGuards } from '@nestjs/common';
import { BuzzService } from './buzz.service';
import { Buzz } from './entities/buzz.entity';
import { CreateBuzzDto } from './dto/create-buzz.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('buzz')
export class BuzzController {
  constructor(private readonly buzzService: BuzzService) {}

  @Get()
  async getAllBuzz(): Promise<Buzz[]> {
    return this.buzzService.getAllBuzz();
  }
@UseGuards(JwtAuthGuard)
  @Post()
  async createBuzz(@Body() createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    return this.buzzService.createBuzz(createBuzzDto);
  }



@Get('count')
async getCount() {
  const count = await this.buzzService.countAll();
  return { count };
}


@UseGuards(JwtAuthGuard)
  @Patch(':id')
  async updateBuzz(
    @Param('id') id: string,
    @Body() createBuzzDto: CreateBuzzDto
  ): Promise<Buzz> {
    return this.buzzService.updateBuzz(id, createBuzzDto);
  }
@UseGuards(JwtAuthGuard)
  @Delete(':id')
  async deleteBuzz(@Param('id') id: string): Promise<void> {
    return this.buzzService.deleteBuzz(id);
  }
}

