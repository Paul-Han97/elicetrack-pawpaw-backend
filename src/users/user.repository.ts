import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';

@CustomRepository(User)
export class UserRepository
  extends Repository<User>
  implements IUserRepository
{
  async findUserCredentialByEmail(username: string): Promise<User> {
    const reuslt = await this.createQueryBuilder('user')
      .select(['user.id', 'credential.username', 'credential.password'])
      .leftJoinAndSelect('user.credential', 'credential')
      .where('credential.username = :username', { username })
      .getOne();
    return reuslt;
  }
}
