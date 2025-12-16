import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Buzz {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column('longtext')
  content: string;

  @Column('json')
  design: object;

  @Column({ type: 'varchar', length: 50 })
  category: string;

  @CreateDateColumn()
  createdAt: Date;
  
  @Column({ type: 'varchar', length: 50 })
  eventName: string;


  @UpdateDateColumn()
  updatedAt: Date;

  @Column({ type: 'date', nullable: true })
  eventDate: Date | null;
}
