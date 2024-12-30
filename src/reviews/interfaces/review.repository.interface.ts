import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

export interface IReviewRepository extends Repository<Review> {
    findMyReviewList(
    userId: number,
    take: number,
    skip: number,
  ): Promise<[Review[], number]>;
}
