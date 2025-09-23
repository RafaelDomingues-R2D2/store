import {
  Body,
  Controller,
  Delete,
  Get,
  Param,
  Post,
  Put,
} from '@nestjs/common';
import { CreateUserDto } from './dto/createUser.dto';
import { FindAllUsersDTO } from './dto/findAllUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';
import { UserService } from './user.service';

@Controller('/users')
export class UserController {
  constructor(private userService: UserService) {}

  @Post()
  async createUser(@Body() userData: CreateUserDto) {
    this.userService.create(userData);

    return {
      user: new FindAllUsersDTO(userData.name),
    };
  }

  @Get()
  async findAllUsers() {
    const savedUser = await this.userService.findAll();

    return savedUser;
  }

  @Put('/:id')
  async update(@Param('id') id: string, @Body() newData: UpdateUserDTO) {
    const updateUser = await this.userService.update(id, newData);

    return {
      user: updateUser,
    };
  }

  @Delete('/:id')
  async deleteUser(@Param('id') id: string) {
    const deletedUser = await this.userService.delete(id);

    return { user: deletedUser, message: 'User deleted successfully' };
  }
}
