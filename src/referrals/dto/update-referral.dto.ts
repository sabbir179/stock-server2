import { Type } from 'class-transformer';
import { IsString } from 'class-validator';
import { User } from 'src/users/schemas/user.schema';

export class UpdateReferralDto {
  @IsString()
  @Type(() => User)
  referee: User;
}
