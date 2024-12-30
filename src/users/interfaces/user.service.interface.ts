import { User } from '../entities/user.entity';

export interface IUserService {
  checkDuplicateNickname(nickname: string): Promise<User | undefined>;
}
