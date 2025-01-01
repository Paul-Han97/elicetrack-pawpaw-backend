import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { GetBoardListQueryDto, GetBoardListResponseDto } from '../dto/get-board-list.dto';
import {
  GetLatestListQueryDto,
  GetLatestListResponseDto,
} from '../dto/get-latest-list.dto';
import {
  GetPopularListQueryDto,
  GetPopularListResponseDto,
} from '../dto/get-popular-list.dto';

export interface IBoardService {
  getPopularList(
    getPopularListQueryDto: GetPopularListQueryDto,
  ): Promise<ResponseData<[GetPopularListResponseDto]>>;

  getLatestList(
    getLatestListQueryDto: GetLatestListQueryDto,
  ): Promise<ResponseData<GetLatestListResponseDto[]>>;

  getBoardList(getBoardListQueryDto: GetBoardListQueryDto): Promise<ResponseData<GetBoardListResponseDto>>;
}
