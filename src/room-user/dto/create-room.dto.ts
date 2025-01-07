import { NOTIFICATION_TYPE } from 'src/common/constants';
import { RoomUser } from '../entities/room-user.entity';

class Sender {
  id: number;

  nickname: string;
}

class Recipient {
  id: number;

  nickname: string;
}

class NotificationResponse {
  id: number;

  sender: Sender;

  recipient: Recipient;

  type: NOTIFICATION_TYPE;

  message: string;

  roomName: string;

  isRead: boolean;

  constructor() {
    this.sender = new Sender();
    this.recipient = new Recipient();
  }
}

export class CreateRoomResponseDto {
  roomUser: RoomUser;

  notification: NotificationResponse;

  constructor() {
    this.notification = new NotificationResponse();
  }
}
