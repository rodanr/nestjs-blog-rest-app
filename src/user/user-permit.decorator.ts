/* eslint-disable @typescript-eslint/no-unused-vars */
import { createParamDecorator, ExecutionContext } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { Request } from 'express';
/**
 * sends true if user is allowed to operate this permission and false if not allowed
 */
export const UserPermit = createParamDecorator(
  (data: unknown, ctx: ExecutionContext) => {
    const request: Request = ctx.switchToHttp().getRequest();
    const jwtReceived = request.headers.authorization.replace('Bearer ', '');
    // console.log(jwtReceived);
    const jwtService = new JwtService();
    const decoded = jwtService.decode(jwtReceived, { json: true });
    // const userName = decoded['username'];
    const userId = parseInt(decoded['sub']);
    const userIdFromParam = parseInt(request.params.id);
    // console.log(userIdFromParam);
    // userId decoded should match the userId the user is trying to modify
    if (!(userId === userIdFromParam)) {
      return false;
    }
    return true;
  },
);
