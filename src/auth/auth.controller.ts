import { Controller, Post, Body, Get, Req, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { JwtAuthGuard } from '../utils/jwt-auth.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('signup')
  async signup(@Body() data: { firstName?: string; lastName?: string; address?: string; email: string; country?: string; district?: string; mobileNumber?: string; password: string }) {
    return this.authService.signup(data);
  }

  @Post('login')
  async login(@Body() data: { email: string; password: string }) {
    return this.authService.login(data);
  }

  @UseGuards(JwtAuthGuard) // Ensure user is authenticated
  @Get('me')
  getUser(@Req() req) {
    return req.user; // User info comes from the token
  }
}
