import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './user.repository';
import { PaginationDto } from 'src/common/dto/pagination.dto';
import { ReviewRepository } from 'src/reviews/review.repository';
import { IReviewRepository } from 'src/reviews/interfaces/review.repository.interface';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
    @Inject(ReviewRepository)
    private readonly reviewRepository: IReviewRepository,
  ) {}

  async checkDuplicateNickname(nickname: string): Promise<User | undefined> {
    if (!nickname || nickname.trim() === '') {
      throw new BadRequestException('닉네임은 필수 입력값입니다.');
    }
    const user = await this.userRepository.findByNickName(nickname);

    if (user) {
      throw new BadRequestException(ERROR_MESSAGE.NICKNAME_ALREADY_EXIST);
    }

    return;
  }

  async getMyReviewList(paginationDto: PaginationDto) {}
}
