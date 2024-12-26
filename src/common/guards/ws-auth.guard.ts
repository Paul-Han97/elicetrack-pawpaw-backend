import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
} from '@nestjs/common';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);
  constructor() {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    this.logger.log('test');

    return true;
  }
}
