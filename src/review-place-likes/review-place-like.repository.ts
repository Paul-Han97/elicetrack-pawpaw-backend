import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { ReviewPlaceLike } from './entities/review-place-like.entity';
import { IReviewPlaceLikeRepository } from './interfaces/review-place-like.repository.interface';

@CustomRepository(ReviewPlaceLike)
export class ReviewPlaceLikeRepository
  extends Repository<ReviewPlaceLike>
  implements IReviewPlaceLikeRepository {}
