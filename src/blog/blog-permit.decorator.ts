// /* eslint-disable @typescript-eslint/no-unused-vars */
// import { createParamDecorator, ExecutionContext } from '@nestjs/common';
// import { JwtService } from '@nestjs/jwt';
// import { Request } from 'express';
// import { BlogService } from './blog.service';
// /**
//  * sends true if user is allowed to operate this permission and false if not allowed
//  */
// export class BlogPermission {
//   constructor(private readonly blogService: BlogService) {}
//   BlogPermit = createParamDecorator(
//     async (data: unknown, ctx: ExecutionContext) => {
//       const request: Request = ctx.switchToHttp().getRequest();
//       const jwtReceived = request.headers.authorization.replace('Bearer ', '');
//       // console.log(jwtReceived);
//       const jwtService = new JwtService();
//       const decoded = jwtService.decode(jwtReceived, { json: true });
//       // const userName = decoded['username'];
//       const userIdFromJWT = parseInt(decoded['sub']);
//       const blogIdFromParam = parseInt(request.params.id);
//       const userFromBlog = await this.blogService.getUserByBlogId(
//         blogIdFromParam,
//       );
//       const userIdFromBlog = userFromBlog.id;

//       // console.log(userIdFromParam);
//       // userId decoded should match the userId the user is trying to modify
//       if (!(userIdFromJWT === userIdFromBlog)) {
//         return false;
//       }
//       return true;
//     },
//   );
// }
