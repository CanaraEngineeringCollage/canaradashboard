import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { FacultyController } from './faculty.controller';
import { FacultyService } from './faculty.service';
import { Faculty } from './entities/faculty.entity';
import { Qualification } from './entities/qualification.entity';
import { Achievement } from './entities/patent.entity';
import { BookChapter } from './entities/book-chapter.entity';
import { Certification } from './entities/certification.entity';
import { JournalPublication } from './entities/journal-publication.entity';
import { ConferencePublication } from './entities/conference-publication.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([
      Faculty,
      Qualification,
      Achievement,
      BookChapter,
      Certification,
      JournalPublication,
      ConferencePublication,
    ]),
  ],
  controllers: [FacultyController],
  providers: [FacultyService],
})
export class FacultyModule {}