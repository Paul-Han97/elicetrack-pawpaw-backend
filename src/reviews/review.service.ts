import { Inject, Injectable } from '@nestjs/common';
import { IReviewRepository } from './interfaces/review.repository.interface';
import { IReviewService } from './interfaces/review.service.interface';
import { ReviewRepository } from './review.repository';

@Injectable()
export class ReviewService implements IReviewService {
  constructor(
    @Inject(ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
  ) {}
}
