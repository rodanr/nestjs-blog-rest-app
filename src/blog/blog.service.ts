import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}

  findAll() {
    return this.blogRepository.find({
      relations: ['comments'],
    });
  }

  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({
      where: { id },
      relations: ['comments'],
    });
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }

  async create(createBlogDto: CreateBlogDto) {
    const user = await this.userRepository.findOne({
      where: { id: createBlogDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const blog = this.blogRepository.create({
      user: user,
      ...createBlogDto,
    });

    return this.blogRepository.save(blog);
  }

  async update(id: number, updateBlogDto: UpdateBlogDto) {
    const blog = await this.blogRepository.preload({
      id: +id,
      ...updateBlogDto,
    });
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return this.blogRepository.save(blog);
  }

  async remove(id: number) {
    const blog = await this.findOne(id);
    return this.blogRepository.remove(blog);
  }

  async createComment(id: number, createCommentDto: CreateCommentDto) {
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    const user = await this.userRepository.findOne({
      where: { id: createCommentDto.userId },
    });
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const comment = this.commentRepository.create({
      blog,
      user,
      ...createCommentDto,
    });
    return this.commentRepository.save(comment);
    // return this.commentRepository.find();
  }

  async updateComment(id: number, updateCommentDto: UpdateCommentDto) {
    const comment = await this.commentRepository.preload({
      id: +id,
      ...updateCommentDto,
    });
    if (!comment) {
      throw new NotFoundException(`Comment #${id} not found`);
    }
    return this.commentRepository.save(comment);
  }
  async getUserByCommentId(id: number) {
    const comment = await this.commentRepository.findOne({
      relations: ['user'],
      where: { id },
    });
    return comment.user;
  }
  async getBlogsByUserId(id: number) {
    return this.userRepository.findOne({
      where: { id },
      relations: { blogs: true },
    });
  }
  async getUserByBlogId(id: number) {
    // need to pass the relation
    const blog = await this.blogRepository.findOne({
      relations: ['user'],
      where: { id },
    });
    return blog.user;
  }
}
