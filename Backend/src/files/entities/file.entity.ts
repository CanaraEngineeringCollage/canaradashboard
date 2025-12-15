import { Entity, PrimaryGeneratedColumn, Column } from 'typeorm';

@Entity('files')
export class FileEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: true })
  name: string;

  // Store PDF file as BLOB
  @Column({ type: 'longblob', nullable: true })
  file: Buffer | null;

  // Store Image file as BLOB
  @Column({ type: 'longblob', nullable: true })
  avatar: Buffer | null;

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
