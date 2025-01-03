import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Review } from '../entities/review.entity';

export interface IReviewRepository extends Repository<Review> {
  findMyReviewList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<[Review[], number]>;
}
