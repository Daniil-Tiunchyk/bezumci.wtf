import { Injectable, UnauthorizedException } from '@nestjs/common';

import { DatabaseService } from 'src/database/database.service';
import { UsersService } from 'src/users/users.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly db: DatabaseService,
    private readonly users: UsersService,
  ) {}

  async login(email: string, password: string) {
    const user = await this.db.getData('users', null, email);
    if (!user) {
      throw new UnauthorizedException('Пошел нахуй черт');
    }
    if (user.password !== password) {
      throw new UnauthorizedException('Твой пароль хуйня');
    }
    return {
      message: 'Ты смог, поздравляю, дебила кусок',
      userId: user.id,
    };
  }

  async register(email: string, password: string) {
    return await this.users.addUser({
      email,
      password,
    });
  }
}
