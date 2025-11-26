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

@UseGuards(JwtAuthGuard)
@Controller('ppt')
export class PptController {
  constructor(private readonly pptService: PptService) {}

  @Get()
  async getLink() {
    const link = await this.pptService.getLink();
    return link ?? { link: null };
  }

  @Post()
  updateLink(@Body() dto: UpdatePptDto) {
    return this.pptService.updateLink(dto.link);
  }
}

