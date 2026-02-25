import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class HomePageImage {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ nullable: true })
  imageUrl: string;

  @Column({ nullable: true })
  mobileImageUrl: string;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
