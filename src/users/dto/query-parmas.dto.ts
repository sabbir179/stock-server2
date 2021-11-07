import { IsEnum, IsOptional } from 'class-validator';
import { UserRole, UserStatus } from '../../common/enum';

export class QueryParamsDto {
  @IsOptional()
  @IsEnum(UserStatus, { each: true })
  status?: UserStatus;

  @IsOptional()
  @IsEnum(UserRole, { each: true })
  role?: UserRole;
}
