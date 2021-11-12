import {
  CanActivate,
  ExecutionContext,
  HttpException,
  HttpStatus,
  Injectable,
} from '@nestjs/common';
import { UserStatus } from '../enum';

@Injectable()
export class IsUserActivated implements CanActivate {
  async canActivate(context: ExecutionContext) {
    const request = context.switchToHttp().getRequest();
    const user = request.user;
    if (user.status === UserStatus.PENDING) {
      throw new HttpException(
        'User is pending for approval.',
        HttpStatus.FORBIDDEN,
      );
    }
    return user.status === UserStatus.ACTIVE;
  }
}
