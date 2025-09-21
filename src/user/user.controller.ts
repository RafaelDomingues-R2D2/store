import { Body, Controller, Get, Param, Post, Put } from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { FindAllUsersDTO } from './dto/findAllUser.dto';
import { UpdateUserDto } from './dto/updateUser.dto';

@Controller('/users')
export class UserController {
  constructor(private userRepository: UserRepository) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    const userEntity = new UserEntity();
    userEntity.id = uuid();
    userEntity.name = userData.name;
    userEntity.email = userData.email;
    userEntity.password = userData.password;

    this.userRepository.create(userEntity);

    return { user: new FindAllUsersDTO(userEntity.id, userEntity.name) };
  }

  @Get()
  async listUsuarios() {
    const savedUser = await this.userRepository.findAll();
    const usersList = savedUser.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return usersList;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDto) {
    const updateUser = await this.userRepository.update(id, newData);

    return {
      user: updateUser,
    };
  }
}
