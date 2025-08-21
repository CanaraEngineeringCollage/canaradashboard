import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @Column({ type: 'date', nullable: true })
  publicationDate: Date;

  @Column({ nullable: true })
  volume: string;

  @Column({ nullable: true })
  issue: string;

  @Column({ nullable: true })
  pageNumbers: string;

  @Column({ nullable: true })
  doi: string;

  @Column({ nullable: true })
  issn: string;

  @Column({ nullable: true })
  indexing: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.internationalJournalPublications,{
    onDelete: 'CASCADE',
  })

  faculty: Faculty;
}