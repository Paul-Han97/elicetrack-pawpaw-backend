import { Repository } from 'typeorm';
import { User } from '../entities/user.entity';
import { GetMyReviewListDto } from '../dto/get-my-review-list.dto';

export interface IUserRepository extends Repository<User> {
  findUserCredentialByEmail(username: string): Promise<User>;

  findByNickName(nickname: string): Promise<User | undefined>;
}
