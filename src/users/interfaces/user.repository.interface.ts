import { Repository } from 'typeorm';
import { DuplicateNicknameQueryDto } from '../dto/duplicate-nickname.dto';
import { User } from '../entities/user.entity';

export interface IUserRepository extends Repository<User> {
  findUserCredentialByEmail(username: string): Promise<User>;

  findByNickName(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<User>;

  findUser(id: number): Promise<User>;

  findNearbyUsers(lon: number, lat: number, radius: number): Promise<User[]>;
}
