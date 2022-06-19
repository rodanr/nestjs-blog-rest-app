import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
import { BlogService } from './blog.service';

@Injectable()
export class AuthorizeCommentGuard implements CanActivate {
  constructor(private readonly blogService: BlogService) {}
  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request: Request = context.switchToHttp().getRequest();
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    // console.log(jwtReceived);
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    // const userName = decoded['username'];
    const userIdFromJWT = parseInt(decoded['sub']);
    const commentIdFromParam = parseInt(request.params.id);
    const userFromComment = await this.blogService.getUserByCommentId(
      commentIdFromParam,
    );
    const userIdFromComment = userFromComment.id;
    // console.log(userIdFromParam);
    // userId decoded should match the userId the user is trying to modify
    if (!(userIdFromJWT === userIdFromComment)) {
      return false;
    }
    return true;
  }
}
