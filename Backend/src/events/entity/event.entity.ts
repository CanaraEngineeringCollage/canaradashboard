import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  @Column()
  tagline: string;

  @Column()
  description: string;

  @Column()
  date: string;

  @Column()
  image: string;
}
