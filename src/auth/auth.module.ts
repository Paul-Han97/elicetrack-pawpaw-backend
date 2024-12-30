import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { UserRepository } from 'src/users/user.repository';
import { UserService } from 'src/users/user.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { ReviewRepository } from 'src/reviews/review.repository';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([UserRepository, ReviewRepository]),
  ],
  controllers: [AuthController],
  providers: [AuthService, UserService],
})
export class AuthModule {}
