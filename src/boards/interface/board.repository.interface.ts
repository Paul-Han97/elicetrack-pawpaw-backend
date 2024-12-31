import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { GetPopularListResponseDto } from '../dto/get-popular-list.dto';

export interface IBoardRepository extends Repository<Board> {
  findMyBoardList(
    userId: number,
    take: number,
    skip: number,
  ): Promise<[Board[], number]>;

  findPopularList(count: number): Promise<[GetPopularListResponseDto]>;
}
