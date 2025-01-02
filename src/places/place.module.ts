import { Module } from '@nestjs/common';
import { TypeOrmCustomModule } from 'src/common/typeorm/typeorm-custom.module';
import { LocationRepository } from 'src/locations/location.repository';
import { PlaceLocationRepository } from 'src/place-locations/place-location.repository';
import { ReviewPlaceLikeRepository } from 'src/review-place-likes/review-place-like.repository';
import { ReviewRepository } from 'src/reviews/review.repository';
import { PlaceController } from './place.controller';
import { PlaceRepository } from './place.repository';
import { PlaceService } from './place.service';

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
  controllers: [PlaceController],
  providers: [PlaceService],
})
export class PlaceModule {}
