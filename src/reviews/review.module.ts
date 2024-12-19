import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { ReviewRepository } from './review.repository';
import { ReviewController } from './review.controller';
import { ReviewService } from './review.service';

@Module({
  imports: [TypeOrmCustomModule.forCustomRepository([ReviewRepository])],
  controllers: [ReviewController],
  providers: [ReviewService],
})
export class ReviewModule {}
