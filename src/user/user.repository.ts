import { Injectable } from '@nestjs/common';
import { UserEntity } from './user.entity';

@Injectable()
export class UserRepository {
  private users: UserEntity[] = [];

  async create(user: UserEntity) {
    this.users.push(user);
  }

  async findAll() {
    return this.users;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.some((user) => user.email === email);
  }
}
