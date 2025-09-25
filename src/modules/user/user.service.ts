import { BadRequestException, Injectable } from '@nestjs/common';
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

  async findByEmail(email: string) {
    const userExist = await this.prisma.user.findUnique({
      where: { email: email },
    });

    if (userExist === null) {
      throw new BadRequestException('Email not found');
    }

    return userExist;
  }

  async update(id: string, newData: UpdateUserDTO) {
    return await this.prisma.user.update({ where: { id: id }, data: newData });
  }

  async delete(id: string) {
    return await this.prisma.user.delete({ where: { id: id } });
  }
}
