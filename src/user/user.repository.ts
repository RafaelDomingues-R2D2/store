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

  private async findById(id: string): Promise<UserEntity> {
    const userExists = this.users.find((user) => user.id === id);

    if (!userExists) {
      throw new Error('User not exists');
    }

    return userExists;
  }

  async update(id: string, newData: Partial<UserEntity>) {
    const userExists = await this.findById(id);

    Object.entries(newData).forEach(([key, value]) => {
      if (key === 'id') {
        return;
      }

      userExists[key] = value;
    });

    return userExists;
  }

  async delete(id: string) {
    const userExists = await this.findById(id);

    this.users = this.users.filter((user) => user.id !== userExists.id);

    return userExists;
  }
}
