import { ResponseData } from 'src/common/types/response.type';
import { GetRoomListDto, GetRoomListResponseDto } from '../dto/get-room-list.dto';
import { RoomUser } from '../entities/room-user.entity';

export interface IRoomUserService {
  getRoomList(getRoomListDto: GetRoomListDto): Promise<ResponseData<GetRoomListResponseDto>>
  createRoom(senderId: number, recipientId: number): Promise<RoomUser>;
  joinRoom(recipientId: number, roomName: string): Promise<RoomUser>;
}
