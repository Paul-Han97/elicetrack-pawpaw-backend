import { Inject, Injectable } from '@nestjs/common';
import { IReviewPlaceLikeRepository } from './interfaces/review-place-like.repository.interface';
import { IReviewPlaceLikeService } from './interfaces/review-place-like.service.interface';
import { ReviewPlaceLikeRepository } from './review-place-like.repository';

@Injectable()
export class ReviewPlaceLikeService implements IReviewPlaceLikeService {
  constructor(
    @Inject(ReviewPlaceLikeRepository)
    private readonly reviewPlaceLikeRepository: IReviewPlaceLikeRepository,
  ) {}
}
