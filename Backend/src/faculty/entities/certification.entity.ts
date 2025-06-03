import { Entity, PrimaryGeneratedColumn, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class Certification {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  name: string;

  @Column()
  issuingOrganization: string;

  @Column()
  issueDate: string;

  @Column({ nullable: true })
  expiryDate: string;

  @Column()
  credentialId: string;

  @Column({ nullable: true })
  credentialUrl: string;

  @Column({ nullable: true })
  credits: string;

  @ManyToOne(() => Faculty, faculty => faculty.certifications)
  @JoinColumn()
  faculty: Faculty;
}
