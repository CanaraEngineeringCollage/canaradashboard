import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToMany,
  CreateDateColumn,
} from 'typeorm';
import { Qualification } from './qualification.entity';
import { Patent } from './patent.entity';
import { BookChapter } from './book-chapter.entity';
import { Certification } from './certification.entity';
import { JournalPublication } from './journal-publication.entity';
import { ConferencePublication } from './conference-publication.entity';

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

  @Column()
  email: string;

  @Column({ type: 'date' })
  joiningDate: Date;

  @Column()
  experience: string;
  @CreateDateColumn()
  createdAt: Date;

  @Column({ type: 'enum', enum: ['Regular', 'Contract', 'Visiting'] })
  employmentType: 'Regular' | 'Contract' | 'Visiting';

  @Column({ type: 'enum', enum: ['Teaching Staff', 'Technical Staff'] }) // New field
  type: 'Teaching Staff' | 'Technical Staff';


 @Column({ type: 'int', nullable: true }) // Correctly defined as INT, nullable
  priority: number | null;

  @Column({ type: 'longblob', nullable: true })
  avatar: Buffer;

  @OneToMany(() => Qualification, (qualification) => qualification.faculty, {
    cascade: true,
  })
  qualifications: Qualification[];

  @OneToMany(() => Patent, (patent) => patent.faculty, { cascade: true })
  patents: Patent[];

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
