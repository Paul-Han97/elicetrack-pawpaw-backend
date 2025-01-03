import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { LocationRepository } from 'src/locations/location.repository';
import { PlaceLocationRepository } from 'src/place-locations/place-location.repository';
import { PlaceRepository } from 'src/places/place.repository';
import { ReviewPlaceLikeRepository } from 'src/review-place-likes/review-place-like.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { CronService } from './cron.service';
import { CronController } from './cron.controller';

@Module({
  imports: [
    TypeOrmCustomModule.forCustomRepository([
      PlaceRepository,
      PlaceLocationRepository,
      LocationRepository,
      ReviewRepository,
      ReviewPlaceLikeRepository,
    ]),
  ],
controllers:[CronController],
  providers: [CronService],
})
export class CronModule {}
