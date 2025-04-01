import { Controller, Delete, Get, Post, Put, Query } from '@nestjs/common';
import { UsersService } from './users.service';

@Controller('polzovateli')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get('vse-dannie')
  async getAllUsers() {
    return this.usersService.getAllUsers();
  }

  @Get('po-id')
  async getUserById(@Query('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return this.usersService.getUserById(userId);
  }

  @Post('dobavit')
  async addUser(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.usersService.addUser({ email, password });
  }

  @Put('izmenit')
  async updateUser(
    @Query('id') id: string,
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    if (!id) {
      throw new Error('ID is required');
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }
    return this.usersService.updateUser(userId, { email, password });
  }

  @Delete('udalit')
  async deleteUser(@Query('id') id: string) {
    if (!id) {
      throw new Error('ID is required');
    }
    const userId = parseInt(id, 10);
    if (isNaN(userId)) {
      throw new Error('Invalid ID format');
    }
    if (userId <= 0) {
      throw new Error('ID must be a positive integer');
    }

    return this.usersService.deleteUser(userId);
  }
}
