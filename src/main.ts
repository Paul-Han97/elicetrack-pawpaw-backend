import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { RedisStore } from 'connect-redis';
import * as session from 'express-session';
import IoRedis from 'ioredis';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ConfigService } from '@nestjs/config';
import { ENV_KEYS } from './common/constants';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const configService = app.get<ConfigService>(ConfigService);

  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(new ValidationPipe());
  app.useGlobalInterceptors(new LoggingInterceptor(),new ResponseInterceptor());
  
  const redisClient = new IoRedis(configService.get<string>(ENV_KEYS.REDIS_HOST));
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
        maxAge: 100000,
      },
    }),
  );

  const config = new DocumentBuilder()
    .setTitle('포포')
    .setDescription('포포의 API 명세서 입니다.')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const documentFactory = () => SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, documentFactory);

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
