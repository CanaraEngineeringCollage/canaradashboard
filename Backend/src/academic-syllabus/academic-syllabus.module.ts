import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AcademicSyllabusService } from './academic-syllabus.service';
import { AcademicSyllabusController } from './academic-syllabus.controller';
import { AcademicSyllabus } from './entities/academic-syllabus.entity';

@Module({
  imports: [TypeOrmModule.forFeature([AcademicSyllabus])],
  controllers: [AcademicSyllabusController],
  providers: [AcademicSyllabusService],
})
export class AcademicSyllabusModule {}
