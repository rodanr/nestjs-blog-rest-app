import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}
  //Operations for blog management
  @Get()
  findAll() {
    return this.blogService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.blogService.findOne(id);
  }
  @Get('/user/:id')
  getBlogsByUserId(@Param('id') id: number) {
    return this.blogService.getBlogsByUserId(id);
  }
  @UseGuards(JwtAuthGuard)
  @Post()
  create(@Body() body: CreateBlogDto) {
    return this.blogService.create(body);
  }
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateBlogDto) {
    return this.blogService.update(id, body);
  }
  @UseGuards(JwtAuthGuard)
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
  // Operations for comment management in blog
  @UseGuards(JwtAuthGuard)
  @Post('/:id/comment')
  createComment(@Param('id') id: number, @Body() body: CreateCommentDto) {
    return this.blogService.createComment(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Patch('/comment/:id')
  updateComment(@Param('id') id: number, @Body() body: UpdateCommentDto) {
    return this.blogService.updateComment(id, body);
  }
  @UseGuards(JwtAuthGuard)
  @Delete('/comment/:id')
  deleteComment(@Param('id') id: number) {
    return this.blogService.removeComment(id);
  }
}
