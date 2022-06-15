import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Blog } from './model/blog.model';

@Injectable()
export class AppService {
  constructor(
    @InjectRepository(Blog)
    private readonly blogRepository: Repository<Blog>,
  ) {}
  findAll() {
    return this.blogRepository.find();
  }
  async findOne(id: number) {
    const blog = await this.blogRepository.findOne({ where: { id } });
    if (!blog) {
      throw new NotFoundException(`Blog #${id} not found`);
    }
    return blog;
  }
  create(createBlog: any) {
    const blog = this.blogRepository.create(createBlog);
    return this.blogRepository.save(blog);
  }
  async update(id: number, updateBlog: any) {
    const blog = await this.blogRepository.preload({
      id: +id,
      ...updateBlog,
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
}
