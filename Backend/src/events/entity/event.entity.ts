import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

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

  @Column('longblob') 
  image: Buffer;
}
