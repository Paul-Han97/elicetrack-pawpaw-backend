import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { GetPopularListResponseDto } from './dto/get-popular-list.dto';
import { Board } from './entities/board.entity';
import { IBoardRepository } from './interface/board.repository.interface';

@CustomRepository(Board)
export class BoardRepository
  extends Repository<Board>
  implements IBoardRepository
{
  async findMyBoardList(
    userId: number,
    take: number,
    skip: number,
  ): Promise<[Board[], number]> {
    const result = await this.createQueryBuilder('board')
      .leftJoinAndSelect('board.user', 'user')
      .leftJoinAndSelect('board.userBoardLike', 'boardLikes')
      .leftJoinAndSelect('board.boardImage', 'boardImages')
      .leftJoinAndSelect('board.boardCategory', 'boardCategory')
      .leftJoinAndSelect('boardImages.image', 'image')
      .where('board.user.id = :userId', { userId })
      .orderBy('board.createdAt', 'DESC')
      .take(take)
      .skip(skip)
      .getManyAndCount();
    return result;
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
}
