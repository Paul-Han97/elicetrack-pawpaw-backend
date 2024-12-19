import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { ReviewPlaceLikeRepository } from './review-place-like.repository';
import { ReviewPlaceLikeController } from './review-place-like.controller';
import { ReviewPlaceLikeService } from './review-place-like.service';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([ReviewPlaceLikeRepository])],
  controllers: [ReviewPlaceLikeController],
  providers: [ReviewPlaceLikeService],
})
export class ReviewPlaceLikeModule {}
