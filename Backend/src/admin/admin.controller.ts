import {
  Controller, Post, Body, Res, Get, UseGuards, Req, Patch
} from '@nestjs/common';
import { AdminService } from './admin.service';
import { Response, Request } from 'express';
import { LoginDto } from './dto/login.dto';
import { UpdateAdminDto } from './dto/update-admin.dto';
import { JwtAuthGuard } from 'src/auth/jwt-auth.guard';

@Controller('admin')
export class AdminController {
  constructor(private readonly adminService: AdminService) {}

  @Post('login')
  login(@Body() dto: LoginDto, @Res() res: Response) {
    return this.adminService.login(dto.email, dto.password, res);
  }

  @UseGuards(JwtAuthGuard)
  @Get('profile')
  profile(@Req() req: Request) {
    return this.adminService.getProfile(req['user'].id);
  }

  @UseGuards(JwtAuthGuard)
  @Patch('update')
  update(@Req() req: Request, @Body() dto: UpdateAdminDto) {
    return this.adminService.updateAdmin(req['user'].id, dto);
  }

  @Post('logout')
  logout(@Res() res: Response) {
    return this.adminService.logout(res);
  }

  // Optional: create one admin if not exists
  @Get('seed')
  seed() {
    return this.adminService.seedAdmin();
  }
}
