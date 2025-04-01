import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getAllUsers() {
    return await this.db.getData('users');
  }

  async getUserById(id: number) {
    return await this.db.getData('users', id);
  }

  async addUser(userData: any) {
    return await this.db.insertData('users', userData);
  }

  async updateUser(id: number, userData: any) {
    return await this.db.updateData('users', id, userData);
  }

  async deleteUser(id: number) {
    return await this.db.deleteData('users', id);
  }
}
