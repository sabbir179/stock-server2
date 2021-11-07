import { IsEmail, IsPhoneNumber, IsString, MinLength } from 'class-validator';

export class RegisterDto {
  @IsEmail()
  email: string;

  @IsString()
  @MinLength(6)
  password: string;

  @IsPhoneNumber()
  phone: string;

  @IsString()
  firstName: string;

  @IsString()
  lastName: string;
}
