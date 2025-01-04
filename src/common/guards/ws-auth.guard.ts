import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { Socket } from 'socket.io';
import { RedisService } from 'src/redis/redis.service';
import { ENV_KEYS, ERROR_MESSAGE, HTTP_STATUS, LOGIN_COOKIE, LOGIN_COOKIE_HEADER, SOCKET_KEYS } from '../constants';
import { SessionData } from 'express-session';

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
    
    if(!cookies) {
      client.emit(SOCKET_KEYS.RECEIVE_ERROR, { status: HTTP_STATUS['401'], message: ERROR_MESSAGE.UNAUTHORIZED })
      throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED);
    }
    
    let loginCookieValue:string = null;
    for(const [key, value] of cookies) {
      loginCookieValue = key.trim() === LOGIN_COOKIE ? value : loginCookieValue;
    }

    if(!loginCookieValue) {
      client.emit(SOCKET_KEYS.RECEIVE_ERROR, { status: HTTP_STATUS['401'], message: ERROR_MESSAGE.UNAUTHORIZED })
      throw new UnauthorizedException(ERROR_MESSAGE.UNAUTHORIZED);
    }

    const session = await this.getSessionData(loginCookieValue)
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
