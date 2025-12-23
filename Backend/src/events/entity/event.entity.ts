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

  @Column({ nullable: true })
  date: string;

  @Column({ type: 'longblob', nullable: true }) 
  image: Buffer;

  @Column({ nullable: true })
  videoUrl: string;

   @Column()
  category: string;

   @CreateDateColumn()
    createdAt: Date;
}
