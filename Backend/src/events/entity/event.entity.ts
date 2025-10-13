import { Column, CreateDateColumn, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class Event {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  title: string;

  // @Column()
  // tagline: string;

   @Column({ type: 'longtext' }) 
  description: string;

  @Column()
  date: string;

  @Column('longblob') 
  image: Buffer;
   @Column()
  category: string;

   @CreateDateColumn()
    createdAt: Date;
}
