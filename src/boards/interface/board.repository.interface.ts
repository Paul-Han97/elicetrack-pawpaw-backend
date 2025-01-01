import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { Board } from '../entities/board.entity';
import { GetPopularListResponseDto } from '../dto/get-popular-list.dto';
import { GetLatestListResponseDto } from '../dto/get-latest-list.dto';

export interface IBoardRepository extends Repository<Board> {
  findMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<[Board[], number]>;

  findPopularList(count: number): Promise<[GetPopularListResponseDto]>;

  findLatestList(count: number): Promise<GetLatestListResponseDto[]>;
}
