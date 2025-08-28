import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('sc_st_grievances')
export class ScstGrievance {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  date: string;

  @Column()
  name: string;

  @Column()
  grievance_from: string;

  @Column()
  contact_number: string;

  @Column()
  email: string;

  @Column()
  category: string;

  @Column('text')
  nature_of_grievance: string;

  @CreateDateColumn()
  created_at: Date;
}
