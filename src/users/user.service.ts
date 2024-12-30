import { BadRequestException, Inject, Injectable } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { IUserService } from './interfaces/user.service.interface';
import { UserRepository } from './user.repository';

@Injectable()
export class UserService implements IUserService {
  constructor(
    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
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
}
