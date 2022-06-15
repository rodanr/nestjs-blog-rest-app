import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BlogController } from './blog.controller';
import { BlogService } from './blog.service';
import { Blog } from './entities/blog.entity';
import { Comment } from './entities/comment.entity';

@Module({
  imports: [
    // Enables to use the blogRepository
    //Blog is the entity imported from models directory
    TypeOrmModule.forFeature([Blog, Comment]),
  ],
  controllers: [BlogController],
  providers: [BlogService],
})
export class BlogModule {}
