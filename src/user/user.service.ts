import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { FindAllUsersDTO } from './dto/findAllUser.dto';
import { UpdateUserDTO } from './dto/updateUser.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(UserEntity)
    private readonly userRepository: Repository<UserEntity>,
  ) {}

  async create(userEntity: UserEntity) {
    await this.userRepository.save(userEntity);
  }

  async findAll() {
    const usersSaved = await this.userRepository.find();

    const usersList = usersSaved.map(
      (user) => new FindAllUsersDTO(user.id, user.name),
    );

    return usersList;
  }

  async update(id: string, newData: UpdateUserDTO) {
    await this.userRepository.update(id, newData);
  }
  async delete(id: string) {
    this.userRepository.delete(id);
  }
}
