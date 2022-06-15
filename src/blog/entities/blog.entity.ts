import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity()
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  title: string;
  @Column()
  description: string;
  @Column()
  author: string;
  @CreateDateColumn({ name: 'created_at' })
  createdOn: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  lastUpdatedOn: Date;
}
