import { ApiProperty } from '@nestjs/swagger';
import { ValidateNested } from 'class-validator';

export class GetRoomListDto {
  userId: number;
}

class Sender {
  @ApiProperty({
    description: '송신자 ID',
  })
  id: number;

  @ApiProperty({
    description: '송신자 닉네임',
  })
  nickname: string;

  @ApiProperty({
    description: '송신자 프로필 이미지',
  })
  imageUrl: string;
}

class RoomList {
  @ApiProperty({
    description: '채팅방 이름',
  })
  name: string;

  @ApiProperty({
    description: '메세지 송신자',
    type: Sender,
  })
  sender: Sender;

  @ApiProperty({
    description: '해당 채팅방에서 마지막으로 보낸 메세지',
  })
  lastMessage: string;

  @ApiProperty({
    description: '새로운 메세지 존재 여부',
  })
  hasNewMessage: boolean;

  constructor(){
    this.sender = new Sender();
  }
}

export class GetRoomListResponseDto {
  @ApiProperty({
    description: '채팅방 목록',
    isArray: true,
    type: RoomList,
  })
  roomList: RoomList[];

  constructor(){
    this.roomList = [];
  }
}
