import { Entity, Column, PrimaryGeneratedColumn, CreateDateColumn } from 'typeorm';

@Entity('events')
export class Event {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  tagline: string;

  @Column()
  date: string;

  @Column()
  type: string;

  @Column({ type: 'text' })
  description: string;

  @Column()
  imageUrl: string;

  @CreateDateColumn()
  createdAt: Date;
}