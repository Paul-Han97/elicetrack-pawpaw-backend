import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ENV_KEYS, MYSQL_MIGRATION_PATH } from './common/constants';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: `.env.${process.env.NODE_ENV}`,
      validationSchema: Joi.object({
        APP_PORT: Joi.number().port().default(3000),
        APP_ENV: Joi.string().valid('prod', 'dev').insensitive(),
        DATABASE_MYSQL_HOST: Joi.string().required(),
        DATABASE_MYSQL_USERNAME: Joi.string().required(),
        DATABASE_MYSQL_PASSWORD: Joi.string().required(),
        DATABASE_MYSQL_NAME: Joi.string().required(),
        DATABASE_MYSQL_PORT: Joi.number().port().required(),
      }),
      isGlobal: true,
    }),
    CacheModule.register({
      // 5분
      ttl: 1000 * 60 * 5,
    }),
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'mysql',
        host: configService.get<string>(ENV_KEYS.DATABASE_MYSQL_HOST),
        port: configService.get<number>(ENV_KEYS.DATABASE_MYSQL_PORT),
        username: configService.get<string>(ENV_KEYS.DATABASE_MYSQL_USERNAME),
        password: configService.get<string>(ENV_KEYS.DATABASE_MYSQL_PASSWORD),
        database: configService.get<string>(ENV_KEYS.DATABASE_MYSQL_NAME),
        entities: [User],
        migrations: [MYSQL_MIGRATION_PATH],
        migrationsTableName: 'migrations',
        synchronize: true,
        retryAttempts: 1,
        logger: 'file',
        logging: true,
      }),
    }),
    UserModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
