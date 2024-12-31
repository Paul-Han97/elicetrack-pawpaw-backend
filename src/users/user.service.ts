import {
  BadRequestException,
  Inject,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { BoardRepository } from 'src/boards/board.repository';
import { IBoardRepository } from 'src/boards/interface/board.repository.interface';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { GetMyBoardListResponseDto } from './dto/get-my-board-list.dto';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}

  async checkDuplicateNickname(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<ResponseData> {
    const user = await this.userRepository.findByNickName(
      duplicateNicknameQueryDto,
    );

    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.NICKNAME_ALREADY_EXIST);
    }

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async getMyReviewList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<ResponseData<{ reviews: GetMyReviewListDto[]; total: number }>> {
    const take = Number(paginationDto.take || 7);
    const perPage = Number(paginationDto.perPage || 1);
    const skip = (perPage - 1) * take;

    const [reviews, total] = await this.reviewRepository.findMyReviewList(
      userId,
      take,
      skip,
    );

    if (reviews.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const responseData: ResponseData<{
      reviews: GetMyReviewListDto[];
      total: number;
    }> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        reviews: reviews.map((review) => ({
          reviewId: review.id,
          placeId: review.place.id,
          title: review.title,
          content: review.content,
          isLikeClicked: review.reviewPlaceLike.some(
            (like) => like.review === review,
          ),
        })),
        total,
      },
    };

    return responseData;
  }

  async getMyBoardList(
    userId: number,
    paginationDto: PaginationDto,
  ): Promise<
    ResponseData<{ boards: GetMyBoardListResponseDto[]; total: number }>
  > {
    const take = Number(paginationDto.take || 7);
    const perPage = Number(paginationDto.perPage || 1);
    const skip = (perPage - 1) * take;

    const [boards, total] = await this.boardRepository.findMyBoardList(
      userId,
      take,
      skip,
    );

    if (boards.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const responseData: ResponseData<{
      boards: GetMyBoardListResponseDto[];
      total: number;
    }> = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: {
        boards: boards.map((board) => ({
          boardId: board.id ?? null,
          title: board.title ?? null,
          content: board.content ?? null,
          boardCategory: board.boardCategory?.korName ?? null,
          createdAt: board.createdAt ?? null,
          imageList: board.boardImage.map((image) => ({
            isPrimary: image.isPrimary ?? null,
            url: image.image?.url ?? null,
          })),
          isLikeClicked: board.userBoardLike.some((like) => like.isLikeClicked),
        })),
        total,
      },
    };

    console.log('myBoardList :', responseData);
    return responseData;
  }
}
