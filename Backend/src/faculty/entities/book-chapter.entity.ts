import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class BookChapter {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column()
  bookTitle: string;

  @Column()
  publisher: string;

  @Column({ nullable: true })
  publicationYear: string;

  @Column({ nullable: true })
  doi: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ default: false })
  scopusIndexed: boolean;

  @Column({ nullable: true })
  pageNumbers: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.bookChapters,{
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}