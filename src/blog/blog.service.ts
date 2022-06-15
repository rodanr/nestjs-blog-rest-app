import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';

@Injectable()
export class BlogService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
    @InjectRepository(Comment)
    private readonly commentRepository: Repository<Comment>,
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
  create(createBlogDto: CreateBlogDto) {
    const blog = this.blogRepository.create(createBlogDto);
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
    const comment = this.commentRepository.create({
      blog: blog,
      ...createCommentDto,
    });

    return this.commentRepository.save(comment);
    // return this.commentRepository.find();
  }
}
