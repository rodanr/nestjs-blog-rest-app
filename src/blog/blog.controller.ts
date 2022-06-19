import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  Req,
  UseGuards,
} from '@nestjs/common';
import { Request } from 'express';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { AuthorizeBlogGuard } from './authorize-blog.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  //Operations for blog management
  @Get()
  findAllBlogs() {
    return this.blogService.findAll();
  }
  @Get(':id')
  findBlogsByBlogId(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }
  @Get('/user/:id')
  getBlogsByUserId(@Param('id') id: number) {
    return this.blogService.getBlogsByUserId(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateBlogDto, @Req() request: Request) {
    return this.blogService.create(body, request);
  }
  @UseGuards(JwtAuthGuard, AuthorizeBlogGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateBlogDto) {
    return this.blogService.update(id, body);
  }
  @UseGuards(JwtAuthGuard, AuthorizeBlogGuard)
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(id);
  }

  // operations for user management in comment and blog
  @Get('/comment/:id/user')
  getUserByCommentId(@Param('id') id: number) {
    return this.blogService.getUserByCommentId(id);
  }
  @Get(':id/user')
  getUserByBlogId(@Param('id') id: number) {
    return this.blogService.getUserByBlogId(id);
  }
  // Posting a comment in a blog
  @UseGuards(JwtAuthGuard)
  @Post('/:id/comment')
  createComment(
    @Param('id') id: number,
    @Body() body: CreateCommentDto,
    @Req() request: Request,
  ) {
    return this.blogService.createComment(id, body, request);
  }
}
