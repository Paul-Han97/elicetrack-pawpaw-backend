import { ResponseData } from 'src/common/types/response.type';
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
}
