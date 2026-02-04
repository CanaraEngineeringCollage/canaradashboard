// src/alumni/alumni.service.ts
import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateAlumniDto } from './dto/create-alumni.dto';
import { Alumni } from './entity/alumni.entity';
import { AlumniPodcast } from './entity/alumni-podcast.entity';
import { CreateAlumniPodcastDto } from './dto/create-alumni-podcast.dto';

@Injectable()
export class AlumniService {
  constructor(
    @InjectRepository(Alumni)
    private alumniRepo: Repository<Alumni>,
    @InjectRepository(AlumniPodcast)
    private podcastRepo: Repository<AlumniPodcast>,
  ) {}

  create(data: CreateAlumniDto) {
    const alumni = this.alumniRepo.create(data);
    return this.alumniRepo.save(alumni);
  }

  async findAll(page: number = 1, limit: number = 10) {
    const skip = (page - 1) * limit;
    const [data, total] = await this.alumniRepo.findAndCount({
      order: { createdAt: 'DESC' },
      skip,
      take: limit,
    });
    return { data, total };
  }
  async countAll() {
    return this.alumniRepo.count();
  }

  async countPodcasts() {
    return this.podcastRepo.count();
  }

  createPodcast(data: CreateAlumniPodcastDto, file?: Express.Multer.File) {
    if (!file) {
      throw new Error('Thumbnail image is required');
    }
    const podcast = this.podcastRepo.create(data);
    podcast.thumbnail = file.buffer;
    return this.podcastRepo.save(podcast);
  }

  findAllPodcasts() {
    return this.podcastRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updatePodcast(
    id: number,
    title: string,
    url: string,
    file?: Express.Multer.File,
  ) {
    const podcast = await this.podcastRepo.findOne({ where: { id } });
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    podcast.title = title;
    podcast.url = url;
    if (file) {
      podcast.thumbnail = file.buffer;
    }
    return this.podcastRepo.save(podcast);
  }

  async removePodcast(id: number) {
    return this.podcastRepo.delete(id);
  }
}
