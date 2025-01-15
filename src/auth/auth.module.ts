import { Module } from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repository';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { ImageRepository } from 'src/images/image.repository';
import { ImageService } from 'src/images/image.service';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserImageRepository } from 'src/user-images/user-image.repository';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocationRepository } from 'src/locations/location.repository';
import { UserLocationRepository } from 'src/user-locations/user-location.repository';
import { MetricsService } from 'src/metrics/metrics.service';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      UserRepository,
      CredentialRepository,
      ReviewRepository,
      ImageRepository,
      UserImageRepository,
      BoardRepository,
      LocationRepository,
      UserLocationRepository
    ]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ImageService, MetricsService],
})
export class AuthModule {}
