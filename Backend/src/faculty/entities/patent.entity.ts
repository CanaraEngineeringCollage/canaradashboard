import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Patent {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  authors: string;

  @Column({ type: 'date' })
  date: Date;

  @Column()
  applicationNumber: string;

  @Column({ nullable: true })
  patentOffice: string;

  @Column({ nullable: true })
  status: string;

  @Column({ nullable: true })
  reference: string;

  @ManyToOne(() => Faculty, (faculty) => faculty.patents)
  faculty: Faculty;
}