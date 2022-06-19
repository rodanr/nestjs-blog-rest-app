/* eslint-disable @typescript-eslint/no-unused-vars */
import {
  Body,
  Controller,
  Get,
  HttpException,
  Param,
  Patch,
  Post,
  Req,
  UnauthorizedException,
  UseGuards,
} from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { JwtAuthGuard } from './jwt-auth.guard';
import { UserService } from './user.service';
import { Request } from 'express';
import { JwtService } from '@nestjs/jwt';
import { UserPermit } from 'src/user/user-permit.decorator';
/*
TODO: User authentication and authorization
 */

@Controller('users')
export class UserController {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}
  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  @Post('login')
  async logIn(@Body() loginUserDto: LoginUserDto) {
    const jwt = await this.userService.login(loginUserDto);
    return { access_token: jwt };
  }
  //custom decorators
  @UseGuards(JwtAuthGuard)
  @Patch(':id')
  updateUser(
    @Param('id') id: number,
    @Body() updateUserDto: UpdateUserDto,
    @Req() request: Request,
    @UserPermit() permission: boolean,
  ) {
    if (!permission) {
      throw new UnauthorizedException(
        'Not authorized to perform this operation',
      );
    }
    return this.userService.updateUser(id, updateUserDto);
  }
}
