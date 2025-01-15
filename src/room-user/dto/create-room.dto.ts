import { RoomUser } from '../entities/room-user.entity';

export class CreateRoomResponseDto {
  roomUser: RoomUser;
  hasRoomUser: boolean;
}
