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
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { PlaceModule } from './places/place.module';
import { Place } from './places/entities/place.entity';
import { BoardImage } from './board-images/entities/board-image.entity';
import { PetImage } from './pet-images/entities/pet-image.entity';
import { UserImage } from './user-images/entities/user-image.entity';
import { BoardCategory } from './board-categories/entities/board-category.entity';
import { UserBoardLike } from './user-board-likes/entities/user-board-like.entity';
import { PlaceLocation } from './place-locations/entities/place-location.entity';
import { UserLocation } from './user-locations/entities/user-location.entity';
import { BoardImageModule } from './board-images/board-image.module';
import { PetImageModule } from './pet-images/pet-image.module';
import { UserImageModule } from './user-images/user-image.module';
import { BoardCategoryModule } from './board-categories/board-category.module';
import { UserBoardLikeModule } from './user-board-likes/user-board-like.module';
import { PlaceLocationModule } from './place-locations/place-location.module';
import { UserLocationModule } from './user-locations/user-location.module';
import { LocationModule } from './locations/location.module';

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
          Gender,
          Role,
          LoginMethod,
          Credential,
          Pet,
          Gender,
          PetSize,
          RoomUser,
          Notification,
          NotificationType,
          Review,
          ReviewPlaceLike
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
    PlaceLocationModule,
    UserLocationModule,
    LocationModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
