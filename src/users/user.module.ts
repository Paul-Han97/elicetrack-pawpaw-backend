import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserController } from './user.controller';
import { UserRepository } from './user.repository';
import { UserService } from './user.service';
import { ReviewRepository } from 'src/reviews/review.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([UserRepository, ReviewRepository]),
  ],
  controllers: [UserController],
  providers: [UserService],
  exports: [UserService],
})
export class UserModule {}
