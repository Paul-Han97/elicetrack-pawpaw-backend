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
import { Board } from './boards/entities/board.entity';
import { BoardModule } from './boards/board.module';
import { BoardImageModule } from './boardimage/boardimage.module';
import { BoardImage } from './boardimage/entities/boardimage.entity';
import { PetImageModule } from './petimage/petimage.module';
import { PetImage } from './petimage/entities/petimage.entity';
import { UserImageModule } from './userimage/userimage.module';
import { UserImage } from './userimage/entities/userimage.entity';
import { BoardCategoryModule } from './boardcategory/boardcategory.module';
import { BoardCategory } from './boardcategory/entities/boardcategory.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { UserBoardLikeModule } from './userboardlike/userboardlike.module';
import { UserBoardLike } from './userboardlike/entities/userboardlike.entity';
import { PlaceModule } from './places/place.module';
import { Place } from './places/entities/place.entity';
import { PlacelocationModule } from './placelocation/placelocation.module';
import { UserLocationModule } from './userlocation/userlocation.module';
import { PlaceLocation } from './placelocation/entities/placelocation.entity';
import { UserLocation } from './userlocation/entities/userlocation.entity';
import { LocationModule } from './location/location.module';

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
        entities: [
          User,
          Board,
          Image,
          BoardImage,
          PetImage,
          UserImage,
          BoardCategory,
          Comment,
          UserBoardLike,
          Place,
          PlaceLocation,
          UserLocation,
          Location,
        ],
        migrations: [MYSQL_MIGRATION_PATH],
        migrationsTableName: 'migrations',
        synchronize: true,
        retryAttempts: 1,
        logger: 'file',
        logging: true,
      }),
    }),
    UserModule,
    BoardModule,
    BoardImageModule,
    PetImageModule,
    UserImageModule,
    BoardCategoryModule,
    CommentModule,
    UserBoardLikeModule,
    PlaceModule,
    PlacelocationModule,
    UserLocationModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
