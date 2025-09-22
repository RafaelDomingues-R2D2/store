import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { UserRepository } from './user.repository';
import { CreateUserDto } from './dto/createUser.dto';
import { UserEntity } from './user.entity';
import { v4 as uuid } from 'uuid';
import { FindAllUsersDTO } from './dto/findAllUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(
    private userRepository: UserRepository,
    private userService: UserService,
  ) {}

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
  async findAllUsers() {
    const savedUser = await this.userService.findAll();

    return savedUser;
  }

  @Put('/:id')
  async updateUser(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updateUser = await this.userRepository.update(id, newData);

    return {
      user: updateUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userRepository.delete(id);

    return { user: deletedUser, message: 'User deleted successfully' };
  }
}
