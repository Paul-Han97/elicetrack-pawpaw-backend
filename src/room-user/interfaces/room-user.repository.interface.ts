import { Repository } from 'typeorm';
import { RoomUser } from '../entities/room-user.entity';

export interface IRoomUserRepository extends Repository<RoomUser> {
  findBySenderAndRecipient(senderId: number, recipientId: number): Promise<RoomUser>;
  findRoomList(userId: number): Promise<RoomUser[]>;
  createRoomUser(senderId: number, roomName: string): Promise<RoomUser>;
}
