import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';
import * as fs from 'fs';
import * as path from 'path';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {
    // Ensure uploads directory exists
    const uploadDir = path.join(process.cwd(), 'uploads');
    if (!fs.existsSync(uploadDir)) {
      fs.mkdirSync(uploadDir, { recursive: true });
    }
  }

  async uploadFile(
    file: Express.Multer.File,
    type: 'pdf' | 'image' | 'video',
    customName?: string,
    department: string = 'Common',
  ) {
    let videoFilename: string | undefined;

    if (type === 'video') {
      const uniqueSuffix = Date.now() + '-' + Math.round(Math.random() * 1e9);
      const extension = path.extname(file.originalname);
      videoFilename = `${uniqueSuffix}${extension}`;
      const uploadPath = path.join(process.cwd(), 'uploads', videoFilename);
      fs.writeFileSync(uploadPath, file.buffer);
    }

    const newFile = this.fileRepo.create({
      name: customName || file.originalname, 
      mimetype: file.mimetype,
      type,
       department,
      file: type === 'pdf' ? file.buffer : undefined,
      avatar: type === 'image' ? file.buffer : undefined,
      video: type === 'video' ? videoFilename : undefined,
    });

    try {
      return await this.fileRepo.save(newFile);
    } catch (error) {
      console.error("Error saving file to database:", error);
      throw error;
    }
  }

  // files.service.ts
  async getFileByName(name: string) {
    const file = await this.fileRepo.findOne({ where: { name } });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

  async getFile(id: number) {
    const file = await this.fileRepo.findOne({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    return file;
  }

 async getAllFiles(
  search?: string,
  type?: 'pdf' | 'image' | 'video',
  department?: string,
  page: number = 1,
  limit: number = 10,
) {
  const qb = this.fileRepo.createQueryBuilder('file');

  if (search) {
    qb.andWhere('file.name LIKE :search', { search: `%${search}%` });
  }
  if (type) {
    qb.andWhere('file.type = :type', { type });
  }
  if (department) {
    qb.andWhere('file.department = :department', { department });
  }

  qb.orderBy('file.id', 'DESC');

  const total = await qb.getCount();
  const data = await qb.skip((page - 1) * limit).take(limit).getMany();

  return {
    data,
    total,
    currentPage: page,
    totalPages: Math.ceil(total / limit),
  };
}



  async deleteFile(id: number) {
    const file = await this.fileRepo.findOne({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    await this.fileRepo.remove(file);
    return { message: 'File deleted successfully' };
  }
}
