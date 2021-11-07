import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { User } from '../users/schemas/user.schema';
import { UsersService } from '../users/users.service';
import { LoginDto } from './dto/login.dto';
import * as bcrypt from 'bcrypt';
import { RegisterDto } from './dto/register.dto';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async validateUser(authLoginDto: LoginDto): Promise<User> {
    const { email, password } = authLoginDto;

    const user = await this.usersService.findByEmail(email);
    const valid = await bcrypt.compare(password, user.password);
    if (!valid) {
      throw new UnauthorizedException();
    }

    return user;
  }

  async login(loginDto: LoginDto): Promise<IToken> {
    const user = await this.validateUser(loginDto);
    return {
      token: this.jwtService.sign({ userId: user._id, role: user.role }),
    };
  }

  async register(registerDto: RegisterDto) {
    return this.usersService.create(registerDto);
  }
}
