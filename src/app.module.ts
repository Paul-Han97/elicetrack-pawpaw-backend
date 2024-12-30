import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as Joi from 'joi';
import { LoggerModule } from 'nestjs-pino';
import * as pino from 'pino';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { AuthModule } from './auth/auth.module';
import { BoardCategoryModule } from './board-categories/board-category.module';
import { BoardCategory } from './board-categories/entities/board-category.entity';
import { BoardImageModule } from './board-images/board-image.module';
import { BoardImage } from './board-images/entities/board-image.entity';
import { BoardModule } from './boards/board.module';
import { Board } from './boards/entities/board.entity';
import { ChatModule } from './chats/chat.module';
import { CommentModule } from './comments/comment.module';
import { Comment } from './comments/entities/comment.entity';
import { ENV_KEYS, MYSQL_MIGRATION_PATH } from './common/constants';
import { UtilModule } from './common/utils/util.module';
import { CredentialModule } from './credentials/credential.module';
import { Credential } from './credentials/entities/credential.entity';
import { Gender } from './genders/entities/gender.entity';
import { GenderModule } from './genders/gender.module';
import { Image } from './images/entities/image.entity';
import { ImageModule } from './images/image.module';
import { Location } from './locations/entities/location.entity';
import { LocationModule } from './locations/location.module';
import { LoginMethod } from './login-methods/entities/login-method.entity';
import { LoginMethodModule } from './login-methods/login-method.module';
import { NotificationType } from './notification-types/entities/notification-type.entity';
import { NotificationTypeModule } from './notification-types/notification-type.module';
import { Notification } from './notifications/entities/notification.entity';
import { NotificationModule } from './notifications/notification.module';
import { PetImage } from './pet-images/entities/pet-image.entity';
import { PetImageModule } from './pet-images/pet-image.module';
import { PetSize } from './pet-sizes/entities/pet-size.entity';
import { PetSizeModule } from './pet-sizes/pet-size..module';
import { Pet } from './pets/entities/pet.entity';
import { PetModule } from './pets/pet.module';
import { PlaceLocation } from './place-locations/entities/place-location.entity';
import { PlaceLocationModule } from './place-locations/place-location.module';
import { Place } from './places/entities/place.entity';
import { PlaceModule } from './places/place.module';
import { ReviewPlaceLike } from './review-place-likes/entities/review-place-like.entity';
import { ReviewPlaceLikeModule } from './review-place-likes/review-place-like.module';
import { Review } from './reviews/entities/review.entity';
import { ReviewModule } from './reviews/review.module';
import { Role } from './roles/entities/role.entity';
import { RoleModule } from './roles/role.module';
import { RoomUser } from './room-user/entities/room-user.entity';
import { RoomUserModule } from './room-user/room-user.module';
import { UserBoardLike } from './user-board-likes/entities/user-board-like.entity';
import { UserBoardLikeModule } from './user-board-likes/user-board-like.module';
import { UserImage } from './user-images/entities/user-image.entity';
import { UserImageModule } from './user-images/user-image.module';
import { UserLocation } from './user-locations/entities/user-location.entity';
import { UserLocationModule } from './user-locations/user-location.module';
import { User } from './users/entities/user.entity';
import { UserModule } from './users/user.module';
import { MailerModule } from '@nestjs-modules/mailer';

@Module({
  imports: [
    LoggerModule.forRoot({
      pinoHttp: {
        stream:
          process.env.NODE_ENV === 'production'
            ? pino.destination({
                dest: './pawpawLogs.log',
                sync: false,
              })
            : undefined,
        transport:
          process.env.NODE_EV === 'production'
            ? undefined
            : { target: 'pino-pretty' },
        redact: {
          remove: true,
          paths: [
            'req.headers["sec-ch-ua-platform"]',
            'req.headers["connection"]',
            'req.headers["user-agent"]',
            'req.headers["sec-ch-ua"]',
            'req.headers["sec-ch-ua-mobile"]',
            'req.headers["sec-fetch-dest"]',
            'req.headers["referer"]',
            'req.headers["accept-encoding"]',
            'req.headers["accept-language"]',
            'req.headers["accept"]',
            'remoteAddress',
            'remotePort',
          ],
        },
      },
    }),
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
        SESSION_SECRET: Joi.string().required(),
        REDIS_HOST: Joi.string().required(),
        REDIS_PREFIX: Joi.string().required(),
        DATABASE_MONGO_HOST: Joi.string().required(),
        DATABASE_MONGO_NAME: Joi.string().required(),
        DATABASE_MONGO_USERNAME: Joi.string().required(),
        DATABASE_MONGO_PASSWORD: Joi.string().required(),
        DATABASE_MONGO_PORT: Joi.number().port().required(),
        PUBLIC_PET_API_KEY: Joi.string().required(),
        PUBLIC_PET_API_END_POINT: Joi.string().required(),
      }),
      isGlobal: true,
    }),
    CacheModule.register({
      // 5분
      ttl: 1000 * 60 * 5,
    }),
    MongooseModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        const host = configService.get<string>(ENV_KEYS.DATABASE_MONGO_HOST);
        const name = configService.get<string>(ENV_KEYS.DATABASE_MONGO_NAME);
        const username = configService.get<string>(
          ENV_KEYS.DATABASE_MONGO_USERNAME,
        );
        const password = configService.get<string>(
          ENV_KEYS.DATABASE_MONGO_PASSWORD,
        );
        const port = configService.get<string>(ENV_KEYS.DATABASE_MONGO_PORT);
        
        const uri = `mongodb://${username}:${password}@${host}:${port}/?authMechanism=SCRAM-SHA-256&authSource=${name}`;
        
        return {
          uri,
          retryAttempts: 0,
        };
      },
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
          PetSize,
          RoomUser,
          Notification,
          NotificationType,
          Review,
          ReviewPlaceLike,
        ],
        migrations: [MYSQL_MIGRATION_PATH],
        migrationsTableName: 'migrations',
        synchronize: false,
        retryAttempts: 1,
        logger: 'file',
        logging: true,
        legacySpatialSupport: false,
      }),
    }),
    MailerModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        transport: {
          host: configService.get<string>(ENV_KEYS.EMAIL_HOST),
          port: configService.get<number>(ENV_KEYS.EMAIL_PORT),
          secure: false,
          auth: {
            user: configService.get<string>(ENV_KEYS.EMAIL_USERNAME),
            pass: configService.get<string>(ENV_KEYS.EMAIL_PASSWORD),
          },
        },
        defaults: {
          from: `"포포" <${configService.get<string>(ENV_KEYS.EMAIL_USERNAME)}>`,
        },
      }),
    }),
    UtilModule,
    AuthModule,
    UserModule,
    BoardModule,
    ImageModule,
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
    PetModule,
    RoleModule,
    LoginMethodModule,
    CredentialModule,
    GenderModule,
    PetSizeModule,
    ReviewModule,
    ReviewPlaceLikeModule,
    RoomUserModule,
    // RoomModule,
    ChatModule,
    NotificationModule,
    NotificationTypeModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
