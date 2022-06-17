/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from 'src/user/entities/user.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Comment } from './comment.entity';

// ordering data in ascending order of id
@Entity({ orderBy: { id: 'ASC' } })
/* We have a Blog class with a title, description, author, createdOn, lastUpdatedOn, comments, and user */
export class Blog {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ length: 100 })
  title: string;
  @Column('text')
  description: string;
  @Column({ length: 100 })
  author: string; // is the username
  @CreateDateColumn({ name: 'created_at' })
  createdOn: Date;
  @UpdateDateColumn({ name: 'updated_at' })
  lastUpdatedOn: Date;
  @OneToMany(() => Comment, (comment) => comment.blog)
  // Array of instance of comment class should be passed
  comments: Comment[];
  //since ManyToOne, so it's the owner, holds foreign key as user_id which is the id(PK of user) of user table
  @ManyToOne((type) => User, (user) => user.blogs)
  // Instance of user class should be passed
  user: User;
}
