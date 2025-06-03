import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyService } from './faculty.service';
import { FacultyController } from './faculty.controller';
import { Faculty } from './entities/faculty.entity';
import { Patent } from './entities/patent.entity';
import { BookChapter } from './entities/book-chapter.entity';
import { Certification } from './entities/certification.entity';
import { JournalPublication } from './entities/journal-publication.entity';
import { ConferencePublication } from './entities/conference-publication.entity';
import { Qualification } from './entities/qualification.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Faculty,
      Patent,
      BookChapter,
      Certification,
      JournalPublication,
      ConferencePublication,
      Qualification
    ])
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
  exports: [FacultyService]
})
export class FacultyModule {}