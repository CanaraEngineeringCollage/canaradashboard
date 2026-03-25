import { Injectable, NotFoundException, Inject } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { Cache } from 'cache-manager';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Event } from './entity/event.entity';
import { CreateEventDto } from './dto/create-event.dto';
import { UpdateEventDto } from './dto/update-event.dto';
import { S3Service } from './s3.service';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepo: Repository<Event>,
    private s3Service: S3Service,
    @Inject(CACHE_MANAGER) private cacheManager: Cache,
  ) {}

  // HELPER: Convert private URL to Signed URL
  private async signEventVideo(event: Event) {
    if (!event.videoUrl) return event;
    
    try {
      // Extract Key from URL: https://bucket.../KEY.mp4
      const urlParts = event.videoUrl.split('.amazonaws.com/');
      if (urlParts.length > 1) {
        const key = urlParts[1];
        // Replace private URL with temporary public URL
        const signedUrl = await this.s3Service.getSignedUrl(key);
        return { ...event, videoUrl: signedUrl };
      }
    } catch (e) {
      console.error('Error signing URL', e);
    }
    return event;
  }

  // 1. CREATE
  async create(dto: CreateEventDto, imageFile: Express.Multer.File | undefined, videoUrl?: string) {
    const event = this.eventRepo.create({
      ...dto,
      image: imageFile ? imageFile.buffer : undefined,
      videoUrl: videoUrl,
    });
    const saved = await this.eventRepo.save(event);
    await this.cacheManager.del('all_events');
    return this.signEventVideo(saved);
  }

  // 2. FIND ALL (Modified to sign all videos in the list)
  async findAll({ category, search, page, limit, all, sortBy = 'createdAt' }: any) {
    const query = this.eventRepo.createQueryBuilder('event');

    if (sortBy === 'date') query.orderBy('event.date', 'DESC');
    else query.orderBy('event.createdAt', 'DESC');

    if (category && category !== 'All') {
      query.andWhere('event.category = :category', { category });
    }

    if (search) {
      query.andWhere('LOWER(event.title) LIKE LOWER(:search)', { search: `%${search}%` });
    }

    let data: Event[] = [];
    let total = 0;

    if (all) {
      data = await query.getMany();
      total = data.length;
    } else {
      [data, total] = await query.skip((page - 1) * limit).take(limit).getManyAndCount();
    }

    // SIGN ALL URLS PARALLEL
    const signedData = await Promise.all(data.map(event => this.signEventVideo(event)));

    return { 
      data: signedData, 
      total, 
      page, 
      limit, 
      totalPages: limit ? Math.ceil(total / limit) : 1 
    };
  }

  // 3. FIND ONE
  async findOne(id: string) {
    const event = await this.eventRepo.findOneBy({ id });
    if (!event) return null;
    return this.signEventVideo(event);
  }

  // 4. UPDATE
  async update(id: string, dto: UpdateEventDto, file?: Express.Multer.File, videoUrl?: string) {
    const existing = await this.eventRepo.findOneBy({ id });
    if (!existing) throw new NotFoundException('Event not found');

    const updatedData: any = { ...dto };

    // If new Image is uploaded
    if (file) {
      updatedData.image = file.buffer;
      // STRICT RULE: If Image is present, Video must be removed.
      if (existing.videoUrl) {
        try {
          const parts = existing.videoUrl.split('.amazonaws.com/');
          if (parts[1]) await this.s3Service.deleteFile(parts[1]);
        } catch (e) { console.error('Failed to delete old video:', e); }
        updatedData.videoUrl = null; // Clear DB reference
      }
    }
    
    // If new Video is uploaded
    if (videoUrl) {
       // Delete old video if exists (replace it)
       if (existing.videoUrl) {
         try {
           const parts = existing.videoUrl.split('.amazonaws.com/');
           if (parts[1]) await this.s3Service.deleteFile(parts[1]);
         } catch (e) { console.error(e); }
       }
       updatedData.videoUrl = videoUrl;
       // STRICT RULE: If Video is present, Image must be removed.
       updatedData.image = null; 
    }

    await this.eventRepo.update(id, updatedData);
    await this.cacheManager.del('all_events');
    const updated = await this.eventRepo.findOneBy({ id });
    return this.signEventVideo(updated!);
  }

  // 5. REMOVE
  async remove(id: string) {
    const event = await this.eventRepo.findOneBy({ id });
    if (event?.videoUrl) {
      try {
        const urlParts = event.videoUrl.split('.amazonaws.com/');
        if (urlParts.length > 1) {
          await this.s3Service.deleteFile(urlParts[1]);
        }
      } catch (err) {
        console.error('Failed to delete S3 file:', err);
      }
    }
    await this.cacheManager.del('all_events');
    return this.eventRepo.delete(id);
  }

  async countAll() { return this.eventRepo.count(); }
  
  async getCategories() {
    return await this.eventRepo.createQueryBuilder('event')
      .select('event.category').distinct(true)
      .where('event.category IS NOT NULL AND event.category != :empty', { empty: '' })
      .getRawMany().then((results) => results.map((r) => r.event_category).filter(Boolean));
  }
}




