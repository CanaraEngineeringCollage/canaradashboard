import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  CreateDateColumn,
} from 'typeorm';

@Entity('alumni_podcast')
export class AlumniPodcast {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  title: string;

  @Column()
  url: string;

  @Column()
  thumbnail: string;

  @CreateDateColumn()
  createdAt: Date;
}
