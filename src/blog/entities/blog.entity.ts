import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

// ordering data in ascending order of id
@Entity({ orderBy: { id: 'ASC' } })
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
  @OneToMany(() => Comment, (comment) => comment.blog)
  comments: Comment[];
}
