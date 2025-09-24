import { Injectable } from '@nestjs/common';
import { FindAllUsersDTO } from './dto/findAllUser.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateUserDto } from './dto/createUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateUserDto) {
    return await this.prisma.user.create({ data });
  }

  async findAll() {
    const usersSaved = await this.prisma.user.findMany();

    const usersList = usersSaved.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return usersList;
  }

  async update(id: string, newData: UpdateUserDTO) {
    return await this.prisma.user.update({ where: { id: id }, data: newData });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
