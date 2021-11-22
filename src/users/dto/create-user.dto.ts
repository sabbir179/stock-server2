import { Type } from 'class-transformer';
import {
  IsEmail,
  IsEnum,
  IsOptional,
  IsPhoneNumber,
  IsString,
  MinLength,
} from 'class-validator';
import { JoinMode } from '../../common/enum';
import { CreditCard } from '../schemas/credit-card.schema';

export class CreateUserDto {
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

  @IsOptional()
  @IsString()
  referral?: string;

  @IsOptional()
  @IsEnum(JoinMode, { each: true })
  joinMode?: JoinMode;

  @IsOptional()
  @Type(() => CreditCard)
  paymentCard?: CreditCard;
}
