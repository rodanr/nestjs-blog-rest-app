/* eslint-disable @typescript-eslint/no-unused-vars */
import { Body, Controller, Get, Param, Post } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { LoginUserDto } from './dto/login-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserService } from './user.service';
/*
TODO: User authentication and authorization
 */

@Controller('users')
export class UserController {
  constructor(private readonly userService: UserService) {}
  @Get()
  getAll() {
    return this.userService.getAll();
  }
  @Post('signup')
  createUser(@Body() createUserDto: CreateUserDto) {
    return this.userService.createUser(createUserDto);
  }
  // @Post('login')
  // logInUser(@Body() loginUserDto: LoginUserDto) {
  //   return 'Successfully logged in';
  //   // returns if the user exists by telling successfully logged in
  // }
  @Post(':id/update')
  updateUser(@Param('id') id: number, @Body() updateUserDto: UpdateUserDto) {
    return this.userService.updateUser(id, updateUserDto);
    // updates user profile
  }
}
