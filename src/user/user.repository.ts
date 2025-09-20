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
}
