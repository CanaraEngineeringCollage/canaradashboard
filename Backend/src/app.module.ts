import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { ConfigModule } from '@nestjs/config';
import { BuzzModule } from './buzz/buzz.module';
import { EventModule } from './events/events.module';
import { AdminModule } from './admin/admin.module';
import { FacultyModule } from './faculty/faculty.module';
import { GrievanceModule } from './grievance/grievance.module';
import { ScstGrievanceModule } from './sc-st-grievance/scst-grievance.module';
import { TimetableModule } from './exam-time-table/timetable.module';
import { CounsellingModule } from './counselling/counselling.module';
import { AlumniModule } from './alumni/alumni.module';
import { AuthModule } from './auth/auth.module';
import { FilesModule } from './files/files.module';
import { PptModule } from './ppt/ppt.module';
import { PlacementModule } from './placement/placement.module';
import { AdmissionModule } from './admission/admission.module';
import { GalleryModule } from './gallery/gallery.module';
import { AppController } from './app.controller';
import { AppService } from './app.service';

import { AcademicCalendarModule } from './academic-calendar/academic-calendar.module';
import { HomePageImagesModule } from './home-page-images/home-page-images.module';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(process.cwd(), 'uploads'),
      serveRoot: '/uploads',
    }),
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: true,
      extra: {
        maxAllowedPacket: 157286400, // 150MB
      },
    }),
    BuzzModule,
    EventModule,
    AdminModule,
    AuthModule,
    FacultyModule,
    GrievanceModule,
    ScstGrievanceModule,
    TimetableModule,
    CounsellingModule,
    AlumniModule,
    FilesModule,
    PptModule,
    PlacementModule,
    AdmissionModule,
    GalleryModule,
    AcademicCalendarModule,
    HomePageImagesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  constructor(private dataSource: DataSource) {}

  async onModuleInit() {
    try {
      await this.dataSource.query('SET GLOBAL max_allowed_packet=157286400');
      console.log('Successfully set GLOBAL max_allowed_packet to 150MB');
    } catch (error) {
      console.error('Failed to set max_allowed_packet:', error);
    }
  }
}
