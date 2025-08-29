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
async login(
  @Body() dto: LoginDto,
  @Res({ passthrough: true }) res: Response,
) {
  const { admin, token } = await this.adminService.loginWithoutRes(dto.email, dto.password);

  res.cookie('jwt', token, {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'strict',
  });

  return { message: 'Login successful', admin };
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
  async logout(@Res({ passthrough: true }) res: Response) {
    // Clear the JWT cookie
    res.clearCookie('jwt', {
      httpOnly: true,
      secure: process.env.NODE_ENV === 'production',
      sameSite: 'strict',
    });
  
    // Return JSON response via service
    return this.adminService.logout();
  }
  

  @Get('seed')
  seed() {
    return this.adminService.seedAdmin();
  }
}
