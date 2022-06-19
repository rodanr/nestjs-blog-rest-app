import { Injectable, NotFoundException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import { Request } from 'express';
import { UserService } from 'src/user/user.service';
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
    private readonly userService: UserService,
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

  async create(createBlogDto: CreateBlogDto, request: Request) {
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    // console.log(jwtReceived);
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    // const userName = decoded['username'];
    const userIdFromJWT = parseInt(decoded['sub']);
    const user = await this.userService.findUserByUserId(userIdFromJWT);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const blog = this.blogRepository.create({
      user: user,
      author: `${user.firstName} ${user.secondName}`,
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
  async getUserByBlogId(id: number) {
    // need to pass the relation
    const blog = await this.blogRepository.findOne({
      relations: ['user'],
      where: { id },
    });
    if (!blog) {
      throw new NotFoundException('Blog #${id} Not Found');
    }
    return blog.user;
  }

  async createComment(
    id: number,
    createCommentDto: CreateCommentDto,
    request: Request,
  ) {
    const blog = await this.findOne(id);
    if (!blog) {
      throw new NotFoundException('Blog not found');
    }
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    // console.log(jwtReceived);
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    // const userName = decoded['username'];
    const userIdFromJWT = parseInt(decoded['sub']);
    const user = await this.userService.findUserByUserId(userIdFromJWT);
    if (!user) {
      throw new NotFoundException('User not found');
    }
    const comment = this.commentRepository.create({
      blog,
      user,
      userName: user.userName,
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
  async removeComment(id: number) {
    const comment = await this.commentRepository.findOne({ where: { id } });
    if (!comment) {
      throw new NotFoundException('Comment #${id} Not Found');
    }
    return this.commentRepository.remove(comment);
  }
  async getUserByCommentId(id: number) {
    const comment = await this.commentRepository.findOne({
      relations: ['user'],
      where: { id },
    });
    if (!comment) {
      throw new NotFoundException('Comment #${id} Not Found');
    }
    return comment.user;
  }
  async getBlogsByUserId(id: number) {
    return this.userService.getBlogsByUserId(id);
  }
}
