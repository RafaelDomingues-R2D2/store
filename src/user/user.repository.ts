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

  async update(id: string, newData: Partial<UserEntity>) {
    const userExists = this.users.find((user) => user.id === id);

    if (!userExists) {
      throw new Error('User not exists');
    }

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      userExists[key] = value;
    });

    return userExists;
  }
}
