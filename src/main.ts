import { ValidationPipe } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import * as cookieParser from 'cookie-parser';
import * as session from 'express-session';
import { Logger } from 'nestjs-pino';
import { AppModule } from './app.module';
import { ENV_KEYS } from './common/constants';
import { HttpExceptionFilter } from './common/filters/http-exception.filter';
import { LoggingInterceptor } from './common/interceptors/logging.interceptor';
import { ResponseInterceptor } from './common/interceptors/response.interceptor';
import { RedisService } from './redis/redis.service';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, { bufferLogs: true });

  const configService = app.get<ConfigService>(ConfigService);

  app.use(cookieParser());
  app.useLogger(app.get(Logger));
  app.useGlobalFilters(new HttpExceptionFilter());
  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
    }),
  );
  app.useGlobalInterceptors(
    new LoggingInterceptor(),
    new ResponseInterceptor(),
  );

  app.setGlobalPrefix('api', {
    exclude: ['/metrics'],
  });

  app.enableCors({
    origin: true,
    credentials: true,
  });

  const sessionOptions = session({
    store: app.get<RedisService>(RedisService).getRedisStore(),
    secret: configService.get<string>(ENV_KEYS.SESSION_SECRET),
    resave: false,
    saveUninitialized: false,
    cookie: {
      httpOnly: true,
      // 1000 * 60 * 60
      maxAge: 3_600_000,
    },
  });

  app.use(sessionOptions);

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
