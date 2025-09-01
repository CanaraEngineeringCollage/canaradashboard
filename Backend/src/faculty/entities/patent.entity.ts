import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Patent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

 

  @Column()
  patentData: string;



  @ManyToOne(() => Faculty, (faculty) => faculty.patents, {
    onDelete: 'CASCADE',
  })
  faculty: Faculty;
}
