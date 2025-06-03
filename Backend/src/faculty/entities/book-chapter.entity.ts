import { Entity, Column, PrimaryGeneratedColumn, ManyToOne, JoinColumn } from 'typeorm';
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

  @Column()
  publicationYear: string;

  @Column({ nullable: true })
  doi: string;

  @Column({ nullable: true })
  isbn: string;

  @Column({ default: false })
  scopusIndexed: boolean;

  @Column()
  pageNumbers: string;

  @ManyToOne(() => Faculty, faculty => faculty.bookChapters)
  @JoinColumn()
  faculty: Faculty;
}
