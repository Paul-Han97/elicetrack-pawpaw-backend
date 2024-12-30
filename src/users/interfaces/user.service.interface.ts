import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { DuplicateNicknameQueryDto } from '../dto/duplicate-nickname.dto';
import { GetMyReviewListDto } from '../dto/get-my-review-list.dto';

export interface IUserService {
  checkDuplicateNickname(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData>;

  getMyReviewList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<ResponseData<{ reviews: GetMyReviewListDto[]; total: number }>>;
}
