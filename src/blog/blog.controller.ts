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

@Controller('blog')
export class BlogController {
  constructor(private readonly appService: BlogService) {}

  @Get()
  findAll() {
    return this.appService.findAll();
  }
  @Get(':id')
  findOne(@Param('id') id: number) {
    return this.appService.findOne(id);
  }
  @Post()
  create(@Body() body: CreateBlogDto) {
    return this.appService.create(body);
  }
  @Patch(':id')
  update(@Param('id') id: number, @Body() body: UpdateBlogDto) {
    return this.appService.update(id, body);
  }
  @Delete(':id')
  remove(@Param('id') id: number) {
    return this.appService.remove(id);
  }
  @Post('/:id/comment')
  createComment(@Param('id') id: number, @Body() body: CreateCommentDto) {
    return this.appService.createComment(id, body);
  }
}
