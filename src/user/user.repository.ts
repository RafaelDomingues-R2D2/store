import { Injectable } from '@nestjs/common';

@Injectable()
export class UserRepository {
  private users: any[] = [];

  async create(user) {
    this.users.push(user);
  }

  async findAll() {
    return this.users;
  }

  async emailExists(email: string): Promise<boolean> {
    return this.users.some((user) => user.email === email);
  }

  private async findById(id: string) {
    const userExists = this.users.find((user) => user.id === id);

    if (!userExists) {
      throw new Error('User not exists');
    }

    return userExists;
  }

  async update(id: string, newData) {
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
