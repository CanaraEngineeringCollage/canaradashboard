import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
} from 'typeorm';

@Entity('academic_calendar')
export class AcademicCalendar {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'longblob' })
  pdf: Buffer;

  @CreateDateColumn()
  createdAt: Date;
}
