import { Controller, Inject } from '@nestjs/common';
import { IReviewPlaceLikeService } from './interfaces/review-place-like.service.interface';
import { ReviewPlaceLikeService } from './review-place-like.service';

@Controller('reviewPlaceLikes')
export class ReviewPlaceLikeController {
  constructor(
    @Inject(ReviewPlaceLikeService)
    private readonly reviewPlaceLikeService: IReviewPlaceLikeService,
  ) {}
}
