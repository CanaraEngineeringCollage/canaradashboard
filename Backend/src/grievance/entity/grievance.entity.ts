import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('grievances')
export class Grievance {
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
  grievance_related_to: string;

  @Column('text')
  nature_of_grievance: string;

  @CreateDateColumn()
  created_at: Date;
}
