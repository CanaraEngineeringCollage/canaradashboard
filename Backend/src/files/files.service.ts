import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FileEntity } from './entities/file.entity';

@Injectable()
export class FilesService {
  constructor(
    @InjectRepository(FileEntity)
    private readonly fileRepo: Repository<FileEntity>,
  ) {}

  async uploadFile(
    file: Express.Multer.File,
    type: 'pdf' | 'image',
    customName?: string,
    department: string = 'Common',
  ) {
    const newFile = this.fileRepo.create({
      name: customName || file.originalname, // <-- use custom name if provided
      mimetype: file.mimetype,
      type,
       department,
      file: type === 'pdf' ? file.buffer : undefined,
      avatar: type === 'image' ? file.buffer : undefined,
    });

    return await this.fileRepo.save(newFile);
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
  type?: 'pdf' | 'image',
  department?: string,
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

  return await qb.getMany();
}


  async deleteFile(id: number) {
    const file = await this.fileRepo.findOne({ where: { id } });
    if (!file) throw new NotFoundException('File not found');
    await this.fileRepo.remove(file);
    return { message: 'File deleted successfully' };
  }
}
