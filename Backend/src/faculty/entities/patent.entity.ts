import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Patent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column()
  date: string;

  @Column()
  applicationNumber: string;

  @Column()
  patentOffice: string;

  @Column()
  status: string;

  @Column()
  reference: string;

  @ManyToOne(() => Faculty, faculty => faculty.patents)
  @JoinColumn()
  faculty: Faculty;
}
