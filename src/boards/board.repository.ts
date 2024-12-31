import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
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
}
