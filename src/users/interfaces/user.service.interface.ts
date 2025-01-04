import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { DuplicateEmailQueryDto } from '../dto/duplicate-email.dto';
import { DuplicateNicknameQueryDto } from '../dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from '../dto/get-my-board-list.dto';
import { GetMyReviewListDto } from '../dto/get-my-review-list.dto';
import {
  GetNearbyUserListQueryDto,
  GetNearbyUserListResponseDto,
  SaveUserLocationDto,
} from '../dto/get-nearby-user-list.dto';
import { GetUserDto, GetUserResponseDto } from '../dto/get-user.dto';
import { GetMyPageResponseDto } from '../dto/get-my-page.dto';
import { UpdateUserDto, UpdateUserResponseDto } from '../dto/update-user.dto';

export interface IUserService {
  checkDuplicateEmail(
    duplicateEmailQueryDto: DuplicateEmailQueryDto,
  ): Promise<ResponseData>;

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

  getUser(getUserDto: GetUserDto): Promise<ResponseData<GetUserResponseDto>>;

  saveUserLocation(
    saveUserLocationDto: SaveUserLocationDto,
  ): Promise<ResponseData>;

  getNearbyUsers(
    getNearbyUserListQueryDto: GetNearbyUserListQueryDto,
  ): Promise<ResponseData<GetNearbyUserListResponseDto[]>>;


  getMyPage(id: number): Promise<ResponseData<GetMyPageResponseDto>>


  updateUser(
    updateUserDto: UpdateUserDto,
  ): Promise<ResponseData<UpdateUserResponseDto>>
}
