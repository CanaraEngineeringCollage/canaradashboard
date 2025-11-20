import { Controller, Get, UnauthorizedException } from '@nestjs/common';

@Controller()
export class AppController {

  @Get()
  root() {
    throw new UnauthorizedException('Unauthorized access');
  }
}
