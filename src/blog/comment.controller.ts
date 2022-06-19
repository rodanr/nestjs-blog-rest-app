import {
  Body,
  Controller,
  Delete,
  Param,
  Patch,
  UseGuards,
} from '@nestjs/common';
import { JwtAuthGuard } from 'src/user/jwt-auth.guard';
import { AuthorizeCommentGuard } from './authorize-comment.guard';
import { BlogService } from './blog.service';
import { UpdateCommentDto } from './dto/update-comment.dto';

@Controller('comments')
export class CommentController {
  constructor(private readonly blogService: BlogService) {}
  // updating comment
  @UseGuards(JwtAuthGuard, AuthorizeCommentGuard)
  @Patch(':id')
  updateComment(@Param('id') id: number, @Body() body: UpdateCommentDto) {
    return this.blogService.updateComment(id, body);
  }
  // deleting comment
  @UseGuards(JwtAuthGuard, AuthorizeCommentGuard)
  @Delete(':id')
  deleteComment(@Param('id') id: number) {
    return this.blogService.removeComment(id);
  }
}
