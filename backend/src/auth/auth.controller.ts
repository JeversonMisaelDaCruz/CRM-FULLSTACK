import { Body, Controller, Post, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthGuard } from './auth.guard';

@Controller('users/auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('login')
  async login(@Body() body) {
    const { email, password } = body;
    return this.authService.login(email, password);
  }

  @UseGuards(AuthGuard)
  @Post('logout')
  async logout(@Req() req) {
    const userId = req.user.id;
    return await this.authService.logout(userId);
  }
}
