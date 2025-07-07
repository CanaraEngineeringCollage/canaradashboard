import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
} from '@nestjs/common';
import { EventsService } from './event.service';

@Controller('events')
export class EventsController {
  constructor(private readonly service: EventsService) {}

  @Get()
  getAll() {
    return this.service.findAll();
  }

  @Get('featured')
  getFeatured() {
    return this.service.findFeatured();
  }

  @Post()
  create(@Body() body: any) {
    return this.service.create(body);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() body: any) {
    return this.service.update(+id, body);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.delete(+id);
  }
}
