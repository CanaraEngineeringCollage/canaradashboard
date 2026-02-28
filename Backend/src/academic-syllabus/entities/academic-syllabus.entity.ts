import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('academic_syllabus_schema')
export class AcademicSyllabus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  department: string;

  @Column()
  category: string; // 'Syllabus' | 'Schema'

  @Column({ nullable: true })
  pdfUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
