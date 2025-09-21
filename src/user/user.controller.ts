import { Body, Controller, Get, Post } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    this.userRepository.create(userData);
    return userData;
  }

  @Get()
  async listUsuarios() {
    return this.userRepository.findAll();
  }
}
