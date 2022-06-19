/* eslint-disable @typescript-eslint/no-unused-vars */
import { User } from 'src/user/entities/user.entity';
import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Blog } from './blog.entity';

@Entity()
export class Comment {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  comment: string;
  @Column({ length: 100, name: 'user_name' })
  userName: string;
  @ManyToOne((type) => Blog, (blog) => blog.comments)
  // instance of Blog class should be passed
  blog: Blog;
  @ManyToOne((type) => User, (user) => user.comments)
  // instance of User class should be passed
  user: User;
}
