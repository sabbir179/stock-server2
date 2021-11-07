import { IsDateString, IsEnum, IsOptional } from 'class-validator';
import { SubscriptionType } from '../../common/enum';

export class SubscriptionDto {
  @IsOptional()
  @IsEnum(SubscriptionType, { each: true })
  type: SubscriptionType;

  @IsDateString()
  expiryDate: Date;
}
