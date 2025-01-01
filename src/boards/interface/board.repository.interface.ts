import { PaginationDto } from 'src/common/dto/pagination.dto';
import { Repository } from 'typeorm';
import { GetBoardListQueryDto, GetBoardListResponseDto } from '../dto/get-board-list.dto';
import { GetLatestListResponseDto } from '../dto/get-latest-list.dto';
import { GetPopularListResponseDto } from '../dto/get-popular-list.dto';
import { Board } from '../entities/board.entity';

export interface IBoardRepository extends Repository<Board> {
  findMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<[Board[], number]>;

  findPopularList(count: number): Promise<[GetPopularListResponseDto]>;

  findLatestList(count: number): Promise<GetLatestListResponseDto[]>;

  findBoardList(getBoardListQueryDto: GetBoardListQueryDto): Promise<GetBoardListResponseDto>;
}
