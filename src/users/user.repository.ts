import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';
import { GetMyReviewListDto } from './dto/get-my-review-list.dto';

@CustomRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async findUserCredentialByEmail(username: string): Promise<User> {
    const reuslt = await this.createQueryBuilder('user')
      .select([
        'user.id',
        'user.canWalkingMate',
        'credential.username',
        'credential.password',
        'role.type',
      ])
      .leftJoinAndSelect('user.credential', 'credential')
      .leftJoinAndSelect('user.role', 'role')
      .where('credential.username = :username', { username })
      .getOne();
    return reuslt;
  }

  async findByNickName(nickname: string): Promise<User | undefined> {
    const result = await this.createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname })
      .getOne();
    return result;
  }
}
