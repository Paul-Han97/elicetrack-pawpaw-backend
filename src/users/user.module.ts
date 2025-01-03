import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { ReviewRepository } from 'src/reviews/review.repository';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { BoardRepository } from 'src/boards/board.repository';
import { LocationRepository } from 'src/locations/location.repository';
import { UserLocationRepository } from 'src/user-locations/user-location.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      UserRepository,
      ReviewRepository,
      BoardRepository,
      LocationRepository,
      UserLocationRepository,
    ]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
