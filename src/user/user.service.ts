import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private readonly userRepository: Repository<User>,
  ) {}
  // async findOne(id: number) {
  //   const user = await this.userRepository.findOne({ where: { id } });
  //   return user;
  // }
  async getAll() {
    return this.userRepository.find();
  }
  createUser(createUserDto: CreateUserDto) {
    const user = this.userRepository.create({ ...createUserDto });
    return this.userRepository.save(user);
    // use for sign up
    // create user
  }
  async updateUser(id: number, updateUserDto: UpdateUserDto) {
    const user = await this.userRepository.preload({
      id: +id,
      ...updateUserDto,
    });
    return this.userRepository.save(user);
  }
}
