import { BadRequestException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { IBoardRepository } from './interface/board.repository.interface';
import { PaginationDto } from 'src/common/dto/pagination.dto';

@CustomRepository(Board)
export class BoardRepository
  extends Repository<Board>
  implements IBoardRepository
{
  async findMyBoardList(
    userId: number,
    paginationDto:PaginationDto
  ): Promise<[Board[], number]> {
    try {
      const queryBuilder = await this.createQueryBuilder('board')
        .leftJoinAndSelect('board.user', 'user')
        .leftJoinAndSelect('board.userBoardLike', 'userBoardLike')
        .leftJoinAndSelect('board.boardImage', 'boardImages')
        .leftJoinAndSelect('board.boardCategory', 'boardCategory')
        .leftJoinAndSelect('boardImages.image', 'image')
        .where('board.user.id = :userId', { userId })
        .orderBy('board.id', 'ASC')
        .take(paginationDto.take);

      if (paginationDto.cursor) {
        queryBuilder.andWhere('board.id > :cursor', { cursor:paginationDto.cursor });
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
