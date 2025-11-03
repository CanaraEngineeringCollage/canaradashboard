import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Qualification } from './qualification.entity';
// Make sure this points to correct entity
import { BookChapter } from './book-chapter.entity';
import { Certification } from './certification.entity';
import { JournalPublication } from './journal-publication.entity';
import { ConferencePublication } from './conference-publication.entity';
import { Achievement } from './patent.entity';

@Entity()
export class Faculty {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  designation: string;

  @Column()
  department: string;

  @Column({ nullable: true })
  email?: string;

  @Column({ type: 'date',nullable: true })
  joiningDate: Date;

  @Column()
  experience: string;
  
  @CreateDateColumn()
  createdAt: Date;


   @Column({ nullable: true })
  subDepartment?: string; // New field for sub-department

  @Column({ type: 'enum', enum: ['Regular', 'Contract', 'Visiting'] })
  employmentType: 'Regular' | 'Contract' | 'Visiting';

  @Column({ type: 'enum', enum: ['Teaching Staff', 'Technical Staff'] })
  type: 'Teaching Staff' | 'Technical Staff';

  @Column({ type: 'int', nullable: true })
  priority: number | null;

  @Column({ type: 'longblob', nullable: true })
  avatar: Buffer;

  @OneToMany(() => Qualification, (qualification) => qualification.faculty, {
    cascade: true,
  })
  qualifications: Qualification[];

  @OneToMany(() => Achievement, (achievement) => achievement.faculty, { 
    cascade: true 
  })
  achievements: Achievement[];

  @OneToMany(() => BookChapter, (bookChapter) => bookChapter.faculty, {
    cascade: true,
  })
  bookChapters: BookChapter[];

  @OneToMany(() => Certification, (certification) => certification.faculty, {
    cascade: true,
  })
  certifications: Certification[];

  @OneToMany(() => JournalPublication, (journal) => journal.faculty, {
    cascade: true,
  })
  internationalJournalPublications: JournalPublication[];

  @OneToMany(() => ConferencePublication, (conference) => conference.faculty, {
    cascade: true,
  })
  internationalConferencePublications: ConferencePublication[];
}