import { Controller, Get, Query } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('aus')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Get('voiti')
  async login(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.authService.login(email, password);
  }

  @Get('zaregistrirovatsya')
  async register(
    @Query('email') email: string,
    @Query('password') password: string,
  ) {
    return this.authService.register(email, password);
  }
}
