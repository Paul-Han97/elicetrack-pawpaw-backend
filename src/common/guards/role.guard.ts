import {
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Injectable,
  Logger,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { Observable } from 'rxjs';
import { ERROR_MESSAGE } from '../constants';
import { Request } from 'express';

@Injectable()
export class RoleGuard implements CanActivate {
  private readonly logger = new Logger(RoleGuard.name);

  constructor(private readonly reflector: Reflector) {}

  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    this.logger.log(`RoleGuard 시작`);

    const needRoles = this.reflector.get<string[]>(
      'roles',
      context.getHandler(),
    );

    this.logger.log(`needRoles: ${needRoles}`);

    if (needRoles.length === 0) {
      return true;
    }

    const request = context.switchToHttp().getRequest<Request>();
    const match = [];

    const user = request.session.user;

    for (const role of needRoles) {
      if (role === user.role) {
        match.push(role);
      }
    }

    if (!match.length) {
      throw new ForbiddenException(ERROR_MESSAGE.FORBIDDEN);
    }

    this.logger.log(`RoleGuard 종료`);
    return true;
  }
}
