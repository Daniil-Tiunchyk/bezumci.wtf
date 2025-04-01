import { Injectable } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';

@Injectable()
export class UsersService {
  constructor(private readonly db: DatabaseService) {}

  async getAllUsers(rasstrel: boolean) {
    const users = await this.db.getData('users');
    if (rasstrel) {
      return this.stalinSort(users, (a: any, b: any) => a.email - b.email);
    }
    return users;
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

  async stalinSort<T>(
    arr: T[],
    compareFn: (a: T, b: T) => number,
  ): Promise<T[]> {
    if (arr.length === 0) return [];

    const result = [arr[0]];
    let lastElement = arr[0];

    for (let i = 1; i < arr.length; i++) {
      if (compareFn(arr[i], lastElement) >= 0) {
        result.push(arr[i]);
        lastElement = arr[i];
      }
    }

    await this.db.replaceData('users', result);

    return result;
  }
}
