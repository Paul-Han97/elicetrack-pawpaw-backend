import { Repository } from 'typeorm';
import { RoomUser } from '../entities/room-user.entity';

export interface IRoomUserRepository extends Repository<RoomUser> {
  findRoomList(userId: number): Promise<RoomUser[]>;
  createRoomUser(senderId: number, roomName: string): Promise<RoomUser>;
}
