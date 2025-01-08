import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { User } from 'src/users/entities/user.entity';
import { Repository } from 'typeorm';
import { RoomUser } from './entities/room-user.entity';
import { IRoomUserRepository } from './interfaces/room-user.repository.interface';

@CustomRepository(RoomUser)
export class RoomUserRepository
  extends Repository<RoomUser>
  implements IRoomUserRepository
{
  async findRoomList(userId: number): Promise<RoomUser[]> {
    const result = await this.createQueryBuilder('roomUser')
      .leftJoinAndSelect('roomUser.sender', 'sender')
      .leftJoinAndSelect('roomUser.recipient', 'recipient')
      .where('sender.id = :userId', { userId })
      .orWhere('recipient.id = :userId', { userId })
      .getMany();

    return result;
  }

  async createRoomUser(senderId: number, roomName: string): Promise<RoomUser> {
    const sender = new User();
    sender.id = senderId;

    const roomUser = new RoomUser();
    roomUser.roomName = roomName;
    roomUser.sender = sender;
    roomUser.createdUser = senderId.toString();

    const result = await this.save(roomUser);
    return result;
  }
}
