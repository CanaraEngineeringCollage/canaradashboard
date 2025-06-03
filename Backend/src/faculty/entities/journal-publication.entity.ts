import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class JournalPublication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column()
  journalName: string;

  @Column()
  publicationDate: string;

  @Column()
  volume: string;

  @Column({ nullable: true })
  issue: string;

  @Column()
  pageNumbers: string;

  @Column({ nullable: true })
  doi: string;

  @Column({ nullable: true })
  issn: string;

  @Column({ nullable: true })
  indexing: string;

  @ManyToOne(() => Faculty, faculty => faculty.internationalJournalPublications)
  @JoinColumn()
  faculty: Faculty;
}
