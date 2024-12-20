import { Controller, Inject } from '@nestjs/common';
import { IReviewService } from './interfaces/review.service.interface';
import { ReviewService } from './review.service';

@Controller('reviews')
export class ReviewController {
  constructor(
    @Inject(ReviewService)
    private readonly reviewService: IReviewService,
  ) {}
}
