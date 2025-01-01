import { BadRequestException } from '@nestjs/common';
import { BOARD_CATEGORY_TYPE_INDEX, ERROR_MESSAGE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import {
  GetBoardListQueryDto,
  GetBoardListResponseDto,
} from './dto/get-board-list.dto';
import { GetLatestListResponseDto } from './dto/get-latest-list.dto';
import { GetPopularListResponseDto } from './dto/get-popular-list.dto';
import { Board } from './entities/board.entity';
import { IBoardRepository } from './interface/board.repository.interface';

@CustomRepository(Board)
export class BoardRepository
  extends Repository<Board>
  implements IBoardRepository
{
  async findLatestList(count: number): Promise<GetLatestListResponseDto[]> {
    const result = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('boardImage.image', 'image')
      .where('boardImage.isPrimary = true')
      .orderBy('board.id', 'DESC')
      .limit(count)
      .getMany();

    const data = result.map<GetLatestListResponseDto>((board) => {
      return {
        id: board.id,
        title: board.title,
        imageUrl: board.boardImage[0].image.url,
      };
    });

    return data;
  }

  async findMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
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
        queryBuilder.andWhere('board.id > :cursor', {
          cursor: paginationDto.cursor,
        });
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

  async findPopularList(count: number): Promise<[GetPopularListResponseDto]> {
    const result = await this.query(
      `
SELECT A.id, A.title, A.content, D.url, COUNT(B.isLikeClicked) isLikeCount
  FROM board A
  LEFT OUTER JOIN user_board_like B ON B.boardId = A.id
  LEFT OUTER JOIN board_image C ON C.boardId = A.id
  LEFT OUTER JOIN image D ON D.id = C.imageId 
GROUP BY A.id, A.title, A.content, D.url
ORDER BY isLikeCount DESC
		,id DESC
LIMIT ?`,
      [Number(count)],
    );
    return result;
  }

  async findBoardList(
    getBoardListQueryDto: GetBoardListQueryDto,
  ): Promise<GetBoardListResponseDto> {
    const { category, cursor, take } = getBoardListQueryDto;

    const categoryId = BOARD_CATEGORY_TYPE_INDEX[category];

    const queryBuilder = this.createQueryBuilder('board')
      .leftJoinAndSelect('board.boardCategory', 'boardCategory')
      .leftJoinAndSelect('board.userBoardLike', 'userBoardLike')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('boardImage.image', 'image')
      .where('boardImage.isPrimary = true')
      .orderBy('board.id', 'DESC')
      .take(take);

    if (category) {
      queryBuilder.andWhere('boardCategory.id = :categoryId', { categoryId });
    }

    if (cursor) {
      queryBuilder.andWhere('board.id < :cursor', { cursor });
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    const boardList = result.map((board) => {
      return {
        category: board.boardCategory.korName,
        title: board.title,
        content: board.content,
        isLikeClicked: board.userBoardLike[0].isLikeClicked ?? null,
        imageList: [
          {
            isPrimary: board.boardImage[0]?.isPrimary ?? null,
            url: board.boardImage[0]?.image.url ?? null,
          },
        ],
      };
    });

    const data: GetBoardListResponseDto = {
      boardList,
      total,
    };

    return data;
  }
}
