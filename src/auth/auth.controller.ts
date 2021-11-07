import { Body, Controller, Post, Request } from '@nestjs/common';
import { CreateAdminDto } from '../users/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
    console.log(loginDto);
    return this.authService.login(loginDto);
  }

  @Post('/register')
  register(@Body() registerDto: RegisterDto) {
    return this.authService.register(registerDto);
  }

  @Post('/create-admin')
  createAdmin(@Body() createAdminDto: CreateAdminDto, @Request() req) {
    const { headers } = req;
    return this.authService.createAdmin(createAdminDto, headers['x-key']);
  }
}
