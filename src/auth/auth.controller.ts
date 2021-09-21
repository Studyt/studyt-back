import { Body, Controller, Get, Param, Post, UseGuards } from '@nestjs/common';
import { LoginDTO } from 'src/common/dtos/login.dto';
import { RegisterDTO } from '../common/dtos/register.dto';
import { AuthService } from './auth.service';
import { JwtGuard } from './jwt/jwt.guard';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async login(@Body() loginDTO: LoginDTO) {
    const { email, password } = loginDTO;
    return this.authService.login(email, password);
  }

  @Post('register')
  async register(@Body() registerDTO: RegisterDTO) {
    return this.authService.register(registerDTO);
  }

  @Post('confirmation/:token')
  async confirmation(@Param('token') token: string) {
    return this.authService.confirmToken(token);
  }

  @UseGuards(JwtGuard)
  @Get('/users')
  async findAll() {
    return this.authService.findAllUsers();
  }
}
