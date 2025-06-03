import { Body, Controller, Get, Post, Patch, Delete, Param } from '@nestjs/common';
import { BuzzService } from './buzz.service';
import { Buzz } from './entities/buzz.entity';
import { CreateBuzzDto } from './dto/create-buzz.dto';

@Controller('buzz')
export class BuzzController {
  constructor(private readonly buzzService: BuzzService) {}

  @Get()
  async getAllBuzz(): Promise<Buzz[]> {
    return this.buzzService.getAllBuzz();
  }

  @Post()
  async createBuzz(@Body() createBuzzDto: CreateBuzzDto): Promise<Buzz> {
    return this.buzzService.createBuzz(createBuzzDto);
  }

  @Patch(':id')
  async updateBuzz(
    @Param('id') id: string,
    @Body() createBuzzDto: CreateBuzzDto
  ): Promise<Buzz> {
    return this.buzzService.updateBuzz(id, createBuzzDto);
  }

  @Delete(':id')
  async deleteBuzz(@Param('id') id: string): Promise<void> {
    return this.buzzService.deleteBuzz(id);
  }
}
