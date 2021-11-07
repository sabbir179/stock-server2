import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';
import { UserRole, UserStatus } from '../enum';

@Injectable()
export class IsActiveUser implements CanActivate {
  canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;

    if (user.role === UserRole.TRADER) {
      return user.status === UserStatus.ACTIVE;
    }
    return true;
  }
}
