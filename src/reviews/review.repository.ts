import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { IReviewRepository } from './interfaces/review.repository.interface';
import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';

@CustomRepository(Review)
export class ReviewRepository
  extends Repository<Review>
  implements IReviewRepository
{
  async findMyReviewList(
    userId: number,
    take: number,
    skip: number,
  ): Promise<[Review[], number]> {
    try {
      const result = await this.createQueryBuilder('review')
        .leftJoinAndSelect('review.place', 'place')
        .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
        .leftJoinAndSelect('review.user', 'user')
        .where('review.user.id = :userId', { userId })
        .take(take)
        .skip(skip)
        .getManyAndCount();

      if (!result[0].length) {
        throw new BadRequestException(ERROR_MESSAGE.NOT_FOUND);
      }

      return result;
    } catch (e) {
      throw new BadRequestException(
        `${ERROR_MESSAGE.NOT_VALID_REQUEST}: ${e.message}`,
      );
    }
  }
}
