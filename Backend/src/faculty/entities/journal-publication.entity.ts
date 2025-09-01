import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class JournalPublication {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  publicationsData: string;


  @ManyToOne(() => Faculty, (faculty) => faculty.internationalJournalPublications,{
    onDelete: 'CASCADE',
  })

  faculty: Faculty;
}