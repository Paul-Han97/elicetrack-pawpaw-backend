import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ResponseData } from 'src/common/types/response.type';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';
import { ReviewRepository } from 'src/reviews/review.repository';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
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

  async getMyReviewList(paginationDto: PaginationDto) {}
}
