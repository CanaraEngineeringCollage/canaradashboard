// faculty.entity.ts

import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  OneToMany,
} from 'typeorm';
import { Patent } from './patent.entity';
import { BookChapter } from './book-chapter.entity';
import { Certification } from './certification.entity';
import { JournalPublication } from './journal-publication.entity';
import { ConferencePublication } from './conference-publication.entity';
import { Qualification } from './qualification.entity';

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

  @Column()
  joiningDate: string;

  @Column()
  experience: string;

  @Column()
  employmentType: string;

  @Column({ default: false })
  isDepartmentHead: boolean;

  @Column({ nullable: true })
  username: string;

  @Column({ nullable: true })
  password: string;

  @Column({ type: 'longblob', nullable: true })
  image: Buffer;

  @OneToMany(() => Patent, patent => patent.faculty, { cascade: true })
  patents: Patent[];

  @OneToMany(() => BookChapter, bookChapter => bookChapter.faculty, { cascade: true })
  bookChapters: BookChapter[];

  @OneToMany(() => Certification, certification => certification.faculty, { cascade: true })
  certifications: Certification[];

  @OneToMany(() => JournalPublication, publication => publication.faculty, { cascade: true })
  internationalJournalPublications: JournalPublication[];

  @OneToMany(() => ConferencePublication, publication => publication.faculty, { cascade: true })
  internationalConferencePublications: ConferencePublication[];

  @OneToMany(() => Qualification, qualification => qualification.faculty, { cascade: true })
  qualifications: Qualification[];
}
