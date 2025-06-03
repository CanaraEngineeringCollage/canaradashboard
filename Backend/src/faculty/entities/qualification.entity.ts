import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Qualification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  degree: string;

  @Column()
  passingYear: string;

  @Column()
  college: string;

  @Column()
  specialization: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.qualifications, { onDelete: 'CASCADE' })
  faculty: Faculty;
}
