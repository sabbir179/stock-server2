import { IsEmail } from 'class-validator';

export class CreateReferralDto {
  @IsEmail()
  email: string;
}
