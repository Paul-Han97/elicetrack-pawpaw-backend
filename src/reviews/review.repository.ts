import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Review } from './entities/review.entity';
import { IReviewRepository } from './interfaces/review.repository.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@CustomRepository(Review)
export class ReviewRepository
  extends Repository<Review>
  implements IReviewRepository
{
  async findMyReviewList(
    userId: number,
    paginationDto:PaginationDto
  ): Promise<[Review[], number]> {
    try {
      const queryBuilder = this.createQueryBuilder('review')
        .leftJoinAndSelect('review.place', 'place')
        .leftJoinAndSelect('review.reviewPlaceLike', 'reviewPlaceLike')
        .leftJoinAndSelect('review.user', 'user')
        .where('review.user.id = :userId', { userId })
        .orderBy('review.id', 'ASC')
        .take(paginationDto.take);

      if (paginationDto.cursor) {
        queryBuilder.andWhere('review.id > :cursor', { cursor:paginationDto.cursor });
      }

      const result = await queryBuilder.getManyAndCount();

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
