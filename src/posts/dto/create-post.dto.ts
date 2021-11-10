import { IsArray, IsEnum, IsString } from 'class-validator';
import { SubscriptionType } from 'src/common/enum';
export class CreatePostDto {
  @IsString()
  title: string;

  @IsString()
  description: string;

  @IsArray()
  @IsEnum(SubscriptionType, { each: true })
  tags: SubscriptionType[];
}
