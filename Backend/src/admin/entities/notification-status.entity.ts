import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  OneToOne,
  JoinColumn,
} from 'typeorm';
import { Admin } from './admin.entity';

@Entity()
export class NotificationStatus {
  @PrimaryGeneratedColumn()
  id: number;

  @Column()
  adminId: number;

  @OneToOne(() => Admin)
  @JoinColumn({ name: 'adminId' })
  admin: Admin;

  @Column({ type: 'bigint', default: 0 })
  admissionLastViewed: string; // TypeORM uses string for bigint to prevent JS precision loss

  @Column({ type: 'bigint', default: 0 })
  alumniLastViewed: string;

  @Column({ type: 'bigint', default: 0 })
  placementLastViewed: string;

  @Column({ type: 'bigint', default: 0 })
  counsellingLastViewed: string;
}
