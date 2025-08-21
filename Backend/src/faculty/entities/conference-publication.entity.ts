import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
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

  @Column({ type: 'date', nullable: true })
  conferenceDate: Date;

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

  @ManyToOne(() => Faculty, (faculty) => faculty.internationalConferencePublications,{
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}