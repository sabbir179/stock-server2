import { ApiProperty } from '@nestjs/swagger';
import { IsArray, IsEnum, IsNumber, IsString } from 'class-validator';
import { SubscriptionType } from 'src/common/enum';

export class CreateStockDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNumber()
  entryPrice: number;

  @ApiProperty()
  @IsNumber()
  exitPrice: number;

  @ApiProperty({ enum: Object.values(SubscriptionType) })
  @IsEnum(SubscriptionType, { each: true })
  subscriptionType: SubscriptionType;

  @ApiProperty()
  @IsArray()
  urls: string[];
}
