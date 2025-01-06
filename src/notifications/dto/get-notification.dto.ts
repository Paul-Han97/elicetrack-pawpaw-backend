import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { ValidateNested } from 'class-validator';
import { NOTIFICATION_TYPE } from 'src/common/constants';

export class GetNotificationDto {
  recipientId: number;
}

class Sender {
  @ApiProperty({
    description: '사용자의 ID',
  })
  id: number;

  @ApiProperty({
    description: '사용자의 닉네임',
  })
  nickname: string;
}

class NotificationList {
  @ApiProperty({
    description: '알림의 ID',
  })
  id: number;

  @ApiProperty({
    description: '알림을 보낸 사용자',
  })
  sender: Sender;

  @ApiProperty({
    description: '알림의 종류',
    enum: NOTIFICATION_TYPE,
  })
  type: NOTIFICATION_TYPE;

  @ApiProperty({
    description: '채팅 내용',
  })
  message: string;

  @ApiProperty({
    description: '채팅방 이름',
  })
  roomName: string;

  @ApiProperty({
    description: '알림을 읽은 상태',
  })
  isRead: boolean;
}

export class GetNotificationResponseDto {
  @ApiProperty({
    description: '알림 목록',
    type: [NotificationList]
  })
  notificationList: NotificationList[];

  constructor(){
    this.notificationList = [];
  }
}
