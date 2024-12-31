import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { DuplicateNicknameQueryDto } from '../dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from '../dto/get-my-board-list.dto';
import { GetMyReviewListDto } from '../dto/get-my-review-list.dto';

export interface IUserService {
  checkDuplicateNickname(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData>;

  getMyReviewList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<
    ResponseData<{ reviews: GetMyReviewListDto[]; nextCursor: number | null }>
  >;

  getMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<
    ResponseData<{
      boards: GetMyBoardListResponseDto[];
      nextCursor: number | null;
    }>
  >;
}
