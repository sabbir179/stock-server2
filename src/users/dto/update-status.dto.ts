import { IsEnum } from 'class-validator';
import { UserStatus } from '../../common/enum';

export class UpdateStatusDto {
  @IsEnum(UserStatus, { each: true })
  status: UserStatus;
}
