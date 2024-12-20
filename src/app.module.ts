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
import { BoardImageModule } from './boardimage/board-image.module';
import { BoardImage } from './boardimage/entities/board-image.entity';
import { PetImageModule } from './petimage/pet-image.module';
import { PetImage } from './petimage/entities/pet-image.entity';
import { UserImageModule } from './userimage/user-image.module';
import { UserImage } from './userimage/entities/user-image.entity';
import { BoardCategoryModule } from './boardcategory/board-category.module';
import { BoardCategory } from './boardcategory/entities/board-category.entity';
import { CommentModule } from './comment/comment.module';
import { Comment } from './comment/entities/comment.entity';
import { UserBoardLikeModule } from './userboardlike/user-board-like.module';
import { UserBoardLike } from './userboardlike/entities/user-board-like.entity';
import { PlaceModule } from './places/place.module';
import { Place } from './places/entities/place.entity';
import { PlaceLocationModule } from './placelocation/place-location.module';
import { UserLocationModule } from './userlocation/user-location.module';
import { PlaceLocation } from './placelocation/entities/place-location.entity';
import { UserLocation } from './userlocation/entities/user-location.entity';
import { LocationModule } from './location/location.module';
import { Gender } from './genders/entities/gender.entity';
import { Role } from './roles/entities/role.entity';
import { LoginMethod } from './login-methods/entities/login-method.entity';
import { Credential } from './credentials/entities/credential.entity';
import { Pet } from './pets/entities/pet.entity';
import { PetSize } from './pet-sizes/entities/pet-size.entity';
import { RoomUser } from './room-user/entities/room-user.entity';
import { Notification } from './notifications/entities/notification.entity';
import { NotificationType } from './notification-types/entities/notification-type.entity';
import { Review } from './reviews/entities/review.entity';
import { ReviewPlaceLike } from './review-place-likes/entities/review-place-like.entity';

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
