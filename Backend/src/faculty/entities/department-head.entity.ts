import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Faculty } from './faculty.entity';

@Entity()
export class DepartmentHead {
    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ default: false })
    isDepartmentHead: boolean;

    @Column()
    username: string;

    @Column()
    password: string;
     @ManyToOne(() => Faculty, (faculty) => faculty.qualifications, { onDelete: 'CASCADE' })
      faculty: Faculty;
}