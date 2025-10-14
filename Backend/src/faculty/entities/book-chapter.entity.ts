import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class BookChapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column('simple-array')
  descriptions: string[];

  @ManyToOne(() => Faculty, (faculty) => faculty.bookChapters, {
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}