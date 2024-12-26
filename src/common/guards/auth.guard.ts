import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { ERROR_MESSAGE } from '../constants';

@Injectable()
export class AuthGuard implements CanActivate {
  private readonly logger = new Logger(AuthGuard.name);

  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    try {
      this.logger.log('AuthGuard 시작');
      const { session } = context.switchToHttp().getRequest<Request>();

      const user = session.user;

      if (!user) {
        throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED);
      }

      session.touch();

      this.logger.log(`AuthGuard 종료`);
      return true;
    } catch (e) {
      this.logger.error(`error catch: ${e}`);
      throw e;
    }
  }
}
