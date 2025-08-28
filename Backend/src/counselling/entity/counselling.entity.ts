import { Entity, PrimaryGeneratedColumn, Column, CreateDateColumn } from 'typeorm';

@Entity('counselling')
export class Counselling {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ length: 100 })
  fullName: string;

  @Column({ length: 100 })
  email: string;

  @Column({ length: 15 })
  phone: string;

  @Column({ type: 'text', nullable: true })
  comments: string;

  @CreateDateColumn()
  createdAt: Date;
}
