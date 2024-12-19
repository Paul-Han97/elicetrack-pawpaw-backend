import { Repository } from 'typeorm';
import { ReviewPlaceLike } from '../entities/review-place-like.entity';

export interface IReviewPlaceLikeRepository
  extends Repository<ReviewPlaceLike> {}
