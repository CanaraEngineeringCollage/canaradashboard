import { Injectable, NotFoundException, UnauthorizedException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';

import { Repository } from 'typeorm';
import * as bcrypt from 'bcryptjs';
import { JwtService } from '@nestjs/jwt';
import { Admin } from './entities/admin.entity';

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

    res.cookie('jwt', token, { httpOnly: true, secure: false });
    return { message: 'Login successful' };
  }

 async getProfile(id: number) {
  const admin = await this.adminRepo.findOne({ where: { id } });
  if (!admin) throw new NotFoundException('Admin not found');

  const { password, ...result } = admin;
  return result;
}

  async updateAdmin(id: number, dto: any) {
    const admin = await this.adminRepo.findOne({ where: { id } });
    if (!admin) throw new NotFoundException('Admin not found');

    if (dto.password) {
      dto.password = await bcrypt.hash(dto.password, 10);
    }

    await this.adminRepo.update(id, dto);
    return { message: 'Admin updated successfully' };
  }

  async logout(res: any) {
    res.clearCookie('jwt');
    return { message: 'Logged out' };
  }

  async seedAdmin() {
    const exists = await this.adminRepo.findOne({ where: { email: 'admin@example.com' } });
    if (!exists) {
      const hashed = await bcrypt.hash('admin123', 10);
      const admin = this.adminRepo.create({
        name: 'Admin',
        email: 'admin@example.com',
        password: hashed,
      });
      await this.adminRepo.save(admin);
    }
  }
}
