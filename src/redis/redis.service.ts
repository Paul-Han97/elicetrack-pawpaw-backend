import { Global, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { RedisStore } from 'connect-redis';
import IoRedis from 'ioredis';
import { ENV_KEYS } from 'src/common/constants';

@Injectable()
export class RedisService {
  private readonly redisClient: IoRedis;
  private readonly redisStore: RedisStore;

  constructor(private readonly configService: ConfigService) {
    this.redisClient = new IoRedis(
      this.configService.get<string>(ENV_KEYS.REDIS_HOST),
    );

    this.redisStore = new RedisStore({
      client: this.redisClient,
      prefix: this.configService.get<string>(ENV_KEYS.REDIS_PREFIX),
    });
  }

  getRedisClient() {
    return this.redisClient;
  }

  getRedisStore() {
    return this.redisStore;
  }

  async get(key: string) {
    return this.redisClient.get(key);
  }
}
