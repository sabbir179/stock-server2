import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { SubscriptionType } from '../../common/enum';

export class StockQueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(SubscriptionType, { each: true })
  subscriptionType?: SubscriptionType;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  @Min(1)
  page = 1;

  @IsOptional()
  @Transform(({ value }) => +value)
  @IsNumber()
  limit = 10;
}
