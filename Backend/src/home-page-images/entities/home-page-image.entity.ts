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

  @Column({ type: 'longblob' })
  image: Buffer;

  @Column({ type: 'longblob' })
  mobileImage: Buffer;

  @CreateDateColumn()
  createdAt: Date;

  @UpdateDateColumn()
  updatedAt: Date;
}
