import { Transform } from 'class-transformer';
import { IsEnum, IsNumber, IsOptional, Min } from 'class-validator';
import { UserRole, UserStatus } from '../../common/enum';

export class UserQueryParamsDto {
  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(UserStatus, { each: true })
  status?: UserStatus;

  @IsOptional()
  @Transform(({ value }) => value.toUpperCase())
  @IsEnum(UserRole, { each: true })
  role?: UserRole;

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
