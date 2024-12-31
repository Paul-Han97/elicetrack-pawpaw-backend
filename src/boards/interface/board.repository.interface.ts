import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

export interface IBoardRepository extends Repository<Board> {
  findMyBoardList(
    userId: number,
    take: number,
    skip: number,
  ): Promise<[Board[], number]>;
}
