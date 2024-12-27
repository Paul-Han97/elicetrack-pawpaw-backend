import * as dotenv from 'dotenv';
import { BoardCategory } from 'src/board-categories/entities/board-category.entity';
import { BoardImage } from 'src/board-images/entities/board-image.entity';
import { Board } from 'src/boards/entities/board.entity';
import { Comment } from 'src/comments/entities/comment.entity';
import { MYSQL_MIGRATION_PATH } from 'src/common/constants';
import { Credential } from 'src/credentials/entities/credential.entity';
import { Gender } from 'src/genders/entities/gender.entity';
import { Image } from 'src/images/entities/image.entity';
import { Location } from 'src/locations/entities/location.entity';
import { LoginMethod } from 'src/login-methods/entities/login-method.entity';
import { NotificationType } from 'src/notification-types/entities/notification-type.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { PetImage } from 'src/pet-images/entities/pet-image.entity';
import { PetSize } from 'src/pet-sizes/entities/pet-size.entity';
import { Pet } from 'src/pets/entities/pet.entity';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { Place } from 'src/places/entities/place.entity';
import { ReviewPlaceLike } from 'src/review-place-likes/entities/review-place-like.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Role } from 'src/roles/entities/role.entity';
import { RoomUser } from 'src/room-user/entities/room-user.entity';
import { UserBoardLike } from 'src/user-board-likes/entities/user-board-like.entity';
import { UserImage } from 'src/user-images/entities/user-image.entity';
import { UserLocation } from 'src/user-locations/entities/user-location.entity';
import { User } from 'src/users/entities/user.entity';
import { DataSource } from 'typeorm';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

export default new DataSource({
  type: 'mysql',
  host: process.env.DATABASE_MYSQL_HOST,
  username: process.env.DATABASE_MYSQL_USERNAME,
  password: process.env.DATABASE_MYSQL_PASSWORD,
  database: process.env.DATABASE_MYSQL_NAME,
  port: Number(process.env.DATABASE_MYSQL_PORT),
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
  logger: 'file',
  logging: true,
});
