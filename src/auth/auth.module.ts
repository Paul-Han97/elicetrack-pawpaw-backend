import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { CredentialRepository } from 'src/credentials/credential.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { ImageRepository } from 'src/images/image.repository';
import { UserImageRepository } from 'src/user-images/user-image.repository';
import { ImageService } from 'src/images/image.service';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([UserRepository, CredentialRepository, ReviewRepository, ImageRepository, UserImageRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService, ImageService],
})
export class AuthModule {}
