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

async loginWithoutRes(email: string, password: string) {
  console.log('🔹 Login attempt with email:', email);
  console.log('🔹 Password received from POST request:', password);

  // Check if admin exists
  let admin = await this.adminRepo.findOne({ where: { email } });
  console.log('🔹 Admin found in DB:', admin);

  // If no admin exists, seed the default admin
  if (!admin) throw new UnauthorizedException('Invalid email or password');

  // Compare password with hash
  const isMatch = await bcrypt.compare(password, admin.password);
  console.log('🔹 Password comparison result:', isMatch);

  if (!isMatch) {
    console.log('❌ Password mismatch!');
    throw new UnauthorizedException('Invalid email or password');
  }

  // Sign JWT
  const token = this.jwtService.sign({ id: admin.id, email: admin.email });
  console.log('🔹 JWT generated:', token);

  // Return admin info including the real password sent in POST
  console.log('🔹 Returning admin info with password for testing');
  return { 
    admin: { email: admin.email, name: admin.name, password }, 
    token 
  };
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


async logout() {
  return { message: 'Logged out successfully' };
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
