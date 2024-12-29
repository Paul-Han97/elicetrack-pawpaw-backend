import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import IoRedis from 'ioredis';
import { AppModule } from './app.module';
import { ENV_KEYS } from './common/constants';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );
  app.setGlobalPrefix('api');

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const redisClient = new IoRedis(
    configService.get<string>(ENV_KEYS.REDIS_HOST),
  );
  const redisStore = new RedisStore({
    client: redisClient,
    prefix: configService.get<string>(ENV_KEYS.REDIS_PREFIX),
  });

  app.use(
    session({
      store: redisStore,
      secret: configService.get<string>(ENV_KEYS.SESSION_SECRET),
      resave: false,
      saveUninitialized: false,
      cookie: {
        httpOnly: true,
        // 1000 * 60 * 60
        maxAge: 3_600_000,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('포포')
    .setDescription('포포의 API 명세서 입니다.')
    .setVersion('1.0')
    .addCookieAuth('connect.sid')
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(configService.get<string>(ENV_KEYS.APP_PORT) ?? 3000);
}
bootstrap();
