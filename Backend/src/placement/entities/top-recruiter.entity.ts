import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('top_recruiters')
export class TopRecruiter {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  companyName: string;

  @Column()
  mode: string; // On Campus/Pool/Off Campus

  @Column()
  type: string; // IT/Core

  @Column()
  package: string;

  @Column()
  count: number;

  @Column()
  year: string;
}
