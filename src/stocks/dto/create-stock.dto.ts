import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { SubscriptionType } from 'src/common/enum';

export class CreateStockDto {
  @IsString()
  name: string;

  @IsNumber()
  entryPrice: number;

  @IsNumber()
  exitPrice: number;

  @IsEnum(SubscriptionType, { each: true })
  subscriptionType: SubscriptionType;

  @IsArray()
  urls: string[];
}
