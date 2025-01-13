import { ResponseData } from 'src/common/types/response.type';
import { CreateRoomResponseDto } from '../dto/create-room.dto';
import {
  GetRoomListDto,
  GetRoomListResponseDto,
} from '../dto/get-room-list.dto';
import { RoomUser } from '../entities/room-user.entity';

export interface IRoomUserService {
  getRoomList(
    getRoomListDto: GetRoomListDto,
  ): Promise<ResponseData<GetRoomListResponseDto>>;
  createRoom(senderId: number): Promise<CreateRoomResponseDto>;
  joinRoom(recipientId: number, roomName: string): Promise<RoomUser>;
  getRoomNameList(userId: number): Promise<string[]>;
}
