import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class ConferencePublication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column()
  conferenceName: string;

  @Column()
  conferenceDate: string;

  @Column({ nullable: true })
  location: string;

  @Column({ nullable: true })
  doi: string;

  @Column({ nullable: true })
  publisher: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ nullable: true })
  pageNumbers: string;

  @ManyToOne(() => Faculty, faculty => faculty.internationalConferencePublications)
  @JoinColumn()
  faculty: Faculty;
}
