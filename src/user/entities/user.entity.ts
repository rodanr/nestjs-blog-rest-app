/* eslint-disable @typescript-eslint/no-unused-vars */
import { Blog } from 'src/blog/entities/blog.entity';
import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { Comment } from 'src/blog/entities/comment.entity';
@Entity()
/* It's a class that represents a user */
export class User {
  @PrimaryGeneratedColumn()
  id: number;
  @Column({ name: 'user_name', unique: true })
  userName: string;
  @Column({ name: 'first_name' })
  firstName: string;
  @Column({ name: 'second_name' })
  secondName: string;
  @Column({ unique: true })
  email: string;
  @Column()
  password: string;
  @OneToMany((type) => Blog, (blog) => blog.user)
  blogs: Blog[];
  @OneToMany((type) => Comment, (comment) => comment.user)
  comments: Comment[];
}
