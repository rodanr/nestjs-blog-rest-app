import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Patch,
  Post,
} from '@nestjs/common';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateBlogDto } from './dto/update-blog.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('blogs')
export class BlogController {
  constructor(private readonly blogService: BlogService) {}

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
  @Get(':id/user')
  getUserByBlogId(@Param('id') id: number) {
    return this.blogService.getUserByBlogId(id);
  }
  @Post()
  create(@Body() body: CreateBlogDto) {
    return this.blogService.create(body);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateBlogDto) {
    return this.blogService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.blogService.remove(id);
  }
  @Get('/comment/:id/user')
  getUserByCommentId(@Param('id') id: number) {
    return this.blogService.getUserByCommentId(id);
  }
  @Post('/:id/comment')
  createComment(@Param('id') id: number, @Body() body: CreateCommentDto) {
    return this.blogService.createComment(id, body);
  }
  @Patch('/comment/:id')
  updateComment(@Param('id') id: number, @Body() body: UpdateCommentDto) {
    return this.blogService.updateComment(id, body);
  }
}
