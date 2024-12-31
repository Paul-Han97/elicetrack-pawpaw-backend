import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';

export interface IBoardRepository extends Repository<Board> {
  findMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<[Board[], number]>;
}
