import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class ConferencePublication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'text' })
  conferencePublications: string;

  @ManyToOne(
    () => Faculty,
    (faculty) => faculty.internationalConferencePublications,
    {
      onDelete: 'CASCADE',
    },
  )
  faculty: Faculty;
}
