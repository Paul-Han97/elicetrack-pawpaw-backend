import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { IReviewRepository } from './interfaces/review.repository.interface';

@CustomRepository(Review)
export class ReviewRepository
  extends Repository<Review>
  implements IReviewRepository {}
