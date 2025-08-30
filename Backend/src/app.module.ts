import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
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

@Module({
  imports: [
    ConfigModule.forRoot({ isGlobal: true }),
    TypeOrmModule.forRoot({
  type: 'mysql',
  host: process.env.DB_HOST,
  port: parseInt(process.env.DB_PORT || '3306', 10),
  username: process.env.DB_USERNAME,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
 extra: {
    socketPath: '/var/run/mysqld/mysqld.sock',
  },
  autoLoadEntities: true,
  synchronize: true,
}),

    FacultyModule,
    BuzzModule,
    EventModule,
    AdminModule,
    FacultyModule,
    GrievanceModule,
    ScstGrievanceModule,
    TimetableModule,
    CounsellingModule,
    AlumniModule
  ],
})
export class AppModule {}
