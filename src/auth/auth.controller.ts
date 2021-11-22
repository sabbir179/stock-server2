import {
  Body,
  Controller,
  Get,
  Post,
  Request,
  UseGuards,
} from '@nestjs/common';
import { ApiBearerAuth, ApiTags } from '@nestjs/swagger';
import { CreateAdminDto } from '../users/dto/create-admin.dto';
import { AuthService } from './auth.service';
import { LoginDto } from './dto/login.dto';
import { RegisterDto } from './dto/register.dto';
import { JwtAuthGuard } from './guards/jwt-auth.guard';

@ApiBearerAuth()
@ApiTags('Authentication')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('/login')
  login(@Body() loginDto: LoginDto) {
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

  @UseGuards(JwtAuthGuard)
  @Get('/me')
  me(@Request() req) {
    const { uid } = req.user;
    return this.authService.me(uid);
  }
}
