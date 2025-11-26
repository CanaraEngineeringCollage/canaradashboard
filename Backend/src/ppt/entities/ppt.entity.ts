import {
  Column,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class PptLink {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'text' })
  link: string;

  @UpdateDateColumn()
  updatedAt: Date;
}


