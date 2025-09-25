import { BadRequestException, Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';
import { UpdateAdminDto } from './dto/update-admin.dto';

@Injectable()
export class AdminService {
  constructor(
    @InjectRepository(Admin)
    private adminRepo: Repository<Admin>,
    private jwtService: JwtService,
  ) {}

  async login(email: string, password: string, res: any) {
    const admin = await this.adminRepo.findOne({ where: { email } });
    
    
    if (!admin) throw new UnauthorizedException('Invalid email or password');

    const isMatch = await bcrypt.compare(password, admin.password);
    
    if (!isMatch) throw new UnauthorizedException('Invalid email or password');

    const token = this.jwtService.sign({ id: admin.id, email: admin.email });
    

res.cookie('jwt', token, {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',  // true on AWS
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',  // 'none' for cross-site
  maxAge: 24 * 60 * 60 * 1000,
  path: '/',
});

    
    return res.json({ message: 'Login successful',admin });
  }

 async getProfile(id: number) {
  const admin = await this.adminRepo.findOne({ where: { id } });
  if (!admin) throw new NotFoundException('Admin not found');

  const { password, ...result } = admin;
  return result;
}

async updateAdmin(id: number, dto: UpdateAdminDto) {
  const admin = await this.adminRepo.findOne({ where: { id } });
  if (!admin) throw new NotFoundException('Admin not found');

  // If user is trying to update password, verify current password first
  if (dto.password) {
    if (!dto.currentPassword) {
      throw new BadRequestException('Current password is required to update the password');
    }

    const isMatch = await bcrypt.compare(dto.currentPassword, admin.password);
    if (!isMatch) {
      throw new BadRequestException('Current password is incorrect');
    }

    // Hash new password
    dto.password = await bcrypt.hash(dto.password, 10);
  }

  // Remove currentPassword before updating
  delete dto.currentPassword;

  await this.adminRepo.update(id, dto);
  return { message: 'Admin updated successfully' };
}


  async logout(res: any) {
res.clearCookie('jwt', {
  httpOnly: true,
  secure: process.env.NODE_ENV === 'production',
  sameSite: process.env.NODE_ENV === 'production' ? 'none' : 'lax',
  path: '/',
});
    return res.json({ message: 'Logged out' });
  }

  async seedAdmin() {
    const exists = await this.adminRepo.findOne({ where: { email: 'admin@example.com' } });
    if (!exists) {
      const hashed = await bcrypt.hash('123456', 10);
      const admin = this.adminRepo.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashed,
      });
      await this.adminRepo.save(admin);
    }
  }
}
