import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  certifications: string;

  

  @ManyToOne(() => Faculty, (faculty) => faculty.certifications,{
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}