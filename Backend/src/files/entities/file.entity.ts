import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  // Store PDF file URL
  @Column({ nullable: true })
  @Column({ nullable: true })
  file: string;

  // Store Image file URL
  @Column({ nullable: true })
  @Column({ nullable: true })
  avatar: string;

  // Store Video file path (filename)
  @Column({ nullable: true })
  video: string;

  @Column({ nullable: true })
  mimetype: string;

  @Column({ nullable: true })
  type: 'pdf' | 'image' | 'video';

  @Column({ default: 'Common' })
  department: string;
}
