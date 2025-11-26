import {
  Body,
  Controller,
  Get,
  Post,
  UseGuards,
} from '@nestjs/common';
import { PptService } from './ppt.service';
import { UpdatePptDto } from './dto/update-ppt.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';


@Controller('ppt')
export class PptController {
  constructor(private readonly pptService: PptService) {}

  @Get()
  async getLink() {
    const link = await this.pptService.getLink();
    return link ?? { link: null };
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  updateLink(@Body() dto: UpdatePptDto) {
    return this.pptService.updateLink(dto.link);
  }
}

