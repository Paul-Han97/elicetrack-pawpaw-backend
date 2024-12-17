import {
    BadRequestException,
    CanActivate,
    ExecutionContext,
    Injectable,
    Logger,
  } from '@nestjs/common';
  import { ConfigService } from '@nestjs/config';
  
  @Injectable()
  export class AuthGuard implements CanActivate {
    private readonly logger = new Logger(AuthGuard.name);
  
    constructor(
      private readonly configService: ConfigService,
    ) {}
  
    async canActivate(context: ExecutionContext): Promise<boolean> {
      try {
        this.logger.log('AuthGuard 시작');
        const { session } = context.switchToHttp().getRequest();
  
        this.logger.log(`AuthGuard 종료`);
        return true;
      } catch (e) {
        this.logger.error(`error catch: ${e}`);
        throw e;
      }
    }
  }
  