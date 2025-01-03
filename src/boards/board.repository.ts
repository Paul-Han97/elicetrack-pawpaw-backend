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
  async findBoardComment(
    id: number,
    commentId: number,
    userId?: number,
  ): Promise<Board> {
    const result = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.comment', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .where('board.id = :id', { id })
      .andWhere('comment.id = :commentId', { commentId })
      .andWhere('commentUser.id = :userId', { userId })
      .getOne();

    return result;
  }

  async findBoard(id: number, userId?: number): Promise<Board> {
    const query = this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.boardCategory', 'boardCategory')
      .leftJoinAndSelect('board.userBoardLike', 'userBoardLike')
      .leftJoinAndSelect('userBoardLike.user', 'userBoardLikeUser')
      .leftJoinAndSelect('board.comment', 'comment')
      .leftJoinAndSelect('comment.user', 'commentUser')
      .leftJoinAndSelect('commentUser.userImage', 'userImage')
      .leftJoinAndSelect('userImage.image', 'commentUserImage')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('boardImage.image', 'image')
      .where('board.id = :id', { id });

    if (userId) {
      query.andWhere('user.id = :userId', { userId });
    }
    const result = await query.getOne();

    return result;
  }

  async findLatestList(count: number): Promise<GetLatestListResponseDto[]> {
    const result = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('boardImage.image', 'image')
      .leftJoinAndSelect('board.boardCategory', 'boardCategory')
      .where('boardImage.isPrimary = true')
      .orderBy('board.id', 'DESC')
      .limit(count)
      .getMany();

    const data = result.map<GetLatestListResponseDto>((board) => {
      return {
        id: board.id,
        title: board.title,
        imageUrl: board.boardImage[0].image.url,
        category: board.boardCategory.korName,
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
SELECT A.id, A.title, A.content, D.url, E.korName, COUNT(B.isLikeClicked) isLikeCount
  FROM board A
  LEFT OUTER JOIN user_board_like B ON B.boardId = A.id
  LEFT OUTER JOIN board_image C ON C.boardId = A.id
  LEFT OUTER JOIN image D ON D.id = C.imageId 
  LEFT OUTER JOIN board_category E ON E.id = A.boardCategoryId
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
    const { userId, category, cursor, take } = getBoardListQueryDto;

    const categoryId = BOARD_CATEGORY_TYPE_INDEX[category];

    const queryBuilder = this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.boardCategory', 'boardCategory')
      .leftJoinAndSelect('board.userBoardLike', 'userBoardLike')
      .leftJoinAndSelect('userBoardLike.user', 'userBoardLikeUser')
      .leftJoinAndSelect('board.boardImage', 'boardImage')
      .leftJoinAndSelect('boardImage.image', 'image')
      .where('boardImage.isPrimary = true')
      .orWhere('boardImage.isPrimary IS NULL')
      .orderBy('board.id', 'DESC')
      .take(take);

    if (category) {
      queryBuilder.andWhere('boardCategory.id = :categoryId', { categoryId });
    }

    if (cursor) {
      queryBuilder.andWhere('board.id < :cursor', { cursor });
    }

    const [result, total] = await queryBuilder.getManyAndCount();

    const getBoardListResponseDto = new GetBoardListResponseDto();

    for (const board of result) {
      getBoardListResponseDto.boardList.push({
        id: board.id,
        category: board.boardCategory.korName,
        title: board.title,
        content: board.content,
        isLikeClicked:
          board.userBoardLike.filter(
            (userBoardLike) => userBoardLike.user.id === userId,
          ).length > 0,
        author: {
          id: board.user.id,
          nickname: board.user.nickname,
        },
        imageList: [
          {
            isPrimary: board.boardImage[0]?.isPrimary ?? null,
            url: board.boardImage[0]?.image.url ?? null,
          },
        ],
      });
    }

    getBoardListResponseDto.total = total;

    return getBoardListResponseDto;
  }
}
