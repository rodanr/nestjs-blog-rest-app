import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlogService } from './blog.service';

@Injectable()
export class AuthorizeBlogGuard implements CanActivate {
  constructor(private readonly blogService: BlogService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    // console.log(jwtReceived);
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    // const userName = decoded['username'];
    const userIdFromJWT = parseInt(decoded['sub']);
    const blogIdFromParam = parseInt(request.params.id);
    const userFromBlog = await this.blogService.getUserByBlogId(
      blogIdFromParam,
    );
    const userIdFromBlog = userFromBlog.id;
    // console.log(userIdFromParam);
    // userId decoded should match the userId the user is trying to modify
    if (!(userIdFromJWT === userIdFromBlog)) {
      return false;
    }
    return true;
  }
}
