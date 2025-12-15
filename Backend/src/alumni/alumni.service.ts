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

  findAll() {
    return this.alumniRepo.find({ order: { createdAt: 'DESC' } });
  }
  async countAll() {
  return this.alumniRepo.count();
}

async countPodcasts() {
  return this.podcastRepo.count();
}

  createPodcast(data: CreateAlumniPodcastDto) {
    const podcast = this.podcastRepo.create(data);
    return this.podcastRepo.save(podcast);
  }

  findAllPodcasts() {
    return this.podcastRepo.find({ order: { createdAt: 'DESC' } });
  }

  async updatePodcast(id: number, url: string) {
    const podcast = await this.podcastRepo.findOne({ where: { id } });
    if (!podcast) {
      throw new Error('Podcast not found');
    }
    podcast.url = url;
    return this.podcastRepo.save(podcast);
  }

  async removePodcast(id: number) {
    return this.podcastRepo.delete(id);
  }

}
