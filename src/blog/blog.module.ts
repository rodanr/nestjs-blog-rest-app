import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/user/entities/user.entity';
import { UserModule } from 'src/user/user.module';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { CommentController } from './comment.controller';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    UserModule,
    // Enables to use the blogRepository
    //Blog is the entity imported from models directory
    TypeOrmModule.forFeature([Blog, Comment, User]),
  ],
  controllers: [BlogController, CommentController],
  providers: [BlogService],
})
export class BlogModule {}
