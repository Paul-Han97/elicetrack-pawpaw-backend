import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { WsException } from '@nestjs/websockets';
import { SessionData } from 'express-session';
import { Socket } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import { ENV_KEYS, ERROR_MESSAGE, LOGIN_COOKIE, LOGIN_COOKIE_HEADER } from '../constants';

@Injectable()
export class WsAuthGuard implements CanActivate {
  private readonly logger = new Logger(WsAuthGuard.name);
  
  constructor(
    private readonly configService: ConfigService,
    private readonly redisService: RedisService
  ) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const client = context.switchToWs().getClient<Socket>();
    const cookies = client.handshake.headers.cookie?.split(';')?.map((cookie) => cookie.split('=')) ?? null;
    
    if (!cookies) {
      throw new WsException(ERROR_MESSAGE.UNAUTHORIZED);
    }
    
    let loginCookieValue: string = null;
    
    for (const [key, value] of cookies) {
      loginCookieValue = key.trim() === LOGIN_COOKIE ? value : loginCookieValue;
    }

    if (!loginCookieValue) {
      throw new WsException(ERROR_MESSAGE.UNAUTHORIZED);
    }

    const session = await this.getSessionData(loginCookieValue)

    if (!session) {
      throw new WsException(ERROR_MESSAGE.UNAUTHORIZED);
    }

    const user = session.user;

    client.data = user;
    return true;
  }

  private async getSessionData(cookie: string):Promise<SessionData> {
    const start = LOGIN_COOKIE_HEADER.length;
    const end = cookie.indexOf('.');
    const prefix = this.configService.get<string>(ENV_KEYS.REDIS_PREFIX);
    const redisKey = prefix + cookie.slice(start, end);
    const redisJson = await this.redisService.get(redisKey);

    return JSON.parse(redisJson);
  }
}
