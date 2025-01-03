import { NotFoundException } from '@nestjs/common';
import { ERROR_MESSAGE } from 'src/common/constants';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { DuplicateNicknameQueryDto } from './dto/duplicate-nickname.dto';
import { User } from './entities/user.entity';
import { IUserRepository } from './interfaces/user.repository.interface';

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

  async findByNickName(
    duplicateNicknameQueryDto: DuplicateNicknameQueryDto,
  ): Promise<User> {
    const { nickname } = duplicateNicknameQueryDto;
    const result = await this.createQueryBuilder('user')
      .where('user.nickname = :nickname', { nickname })
      .getOne();
    return result;
  }

  async findNearbyUsers(
    lon: number,
    lat: number,
    radius: number,
  ): Promise<User[]> {
    try {
      return await this.createQueryBuilder('user')
        .leftJoinAndSelect('user.userLocation', 'userLocation')
        .leftJoinAndSelect('userLocation.location', 'location')
        .where(
          'ST_Distance_Sphere(location.point, POINT(:lon, :lat)) < :radius',
          {
            lon,
            lat,
            radius,
          },
        )
        .andWhere('user.canWalkingMate = true')
        .getMany();
    } catch (e) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }
  }
}
