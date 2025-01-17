import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { BoardRepository } from 'src/boards/board.repository';
import { LocationRepository } from 'src/locations/location.repository';
import { UserLocationRepository } from 'src/user-locations/user-location.repository';
import { ImageRepository } from 'src/images/image.repository';
import { UserImageRepository } from 'src/user-images/user-image.repository';
import { ImageService } from 'src/images/image.service';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { UtilService } from 'src/common/utils/util.service';
import { UtilModule } from 'src/common/utils/util.module';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      UserRepository,
      ReviewRepository,
      BoardRepository,
      LocationRepository,
      UserLocationRepository,
      ImageRepository,
      UserImageRepository,
      CredentialRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService, ImageService],
  exports: [UserService],
})
export class UserModule {}
