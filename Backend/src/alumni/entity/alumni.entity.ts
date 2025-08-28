// src/alumni/alumni.entity.ts
import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('alumni')
export class Alumni {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  fullName: string;

  @Column()
  email: string;

  @Column()
  phone: string;

  @Column({ nullable: true })
  dateOfBirth: string;

  @Column({ nullable: true })
  usn: string;

  @Column({ nullable: true })
  address: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @CreateDateColumn({ type: 'timestamp' })
  createdAt: Date;
}
