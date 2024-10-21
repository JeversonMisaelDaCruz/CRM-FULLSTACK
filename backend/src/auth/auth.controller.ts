import { Body, Controller, Post } from '@nestjs/common';
import { AuthService } from './auth.service';

@Controller('users/auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() email: string, password: string) {
    return this.authService.login(email, password);
  }
}
