import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Achievement {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  heading: string;

  @Column('simple-array') // Stores array of strings
  descriptions: string[];

  @ManyToOne(() => Faculty, (faculty) => faculty.achievements, {
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}