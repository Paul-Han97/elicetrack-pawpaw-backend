import { NOTIFICATION_TYPE } from 'src/common/constants';

export class WsCreateNotificationDto {
  senderId: number;
  recipientId: number;
  chatId: number;
  roomName: string;
}

class Sender {
  id: number;
  nickname: string;
}

class Recipient {
  id: number;
  nickname: string;
}

export class WsCreateNotificationResponseDto {
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
