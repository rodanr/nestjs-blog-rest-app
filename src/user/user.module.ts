import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Blog } from 'src/blog/entities/blog.entity';
import { User } from './entities/user.entity';
import { Comment } from 'src/blog/entities/comment.entity';
import { UserController } from './user.controller';
import { UserService } from './user.service';

@Module({
  imports: [TypeOrmModule.forFeature([Blog, Comment, User])],
  controllers: [UserController],
  providers: [UserService],
})
export class UserModule {}
