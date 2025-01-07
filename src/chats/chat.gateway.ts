import { Inject, UseGuards } from '@nestjs/common';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  OnGatewayInit,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import * as dotenv from 'dotenv';
import { Server, Socket } from 'socket.io';
import { SOCKET_KEYS } from 'src/common/constants';
import { WsAuthGuard } from 'src/common/guards/ws-auth.guard';
import { IRoomUserService } from 'src/room-user/interfaces/room-user.service.interface';
import { RoomUserService } from 'src/room-user/room-user.service';
import { User } from 'src/users/entities/user.entity';
import { ChatService } from './chat.service';
import { IChatService } from './interfaces/chat.service.interface';
import { SendMessageDto } from './dto/send-message.dto';
import { GetNotificationResponseDto } from 'src/notifications/dto/get-notification.dto';

dotenv.config({ path: `.env.${process.env.NODE_ENV}` });

@WebSocketGateway(Number(process.env.SOCKET_PORT), {
  namespace: SOCKET_KEYS.NAMESPACE,
  cors: {
    origin: true,
    credentials: true,
  },
})
@UseGuards(WsAuthGuard)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(ChatService)
    private readonly chatService: IChatService,

    @Inject(RoomUserService)
    private readonly roomUserService: IRoomUserService,
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  async afterInit(server: Server) {}

  async handleConnection(client: Socket) {}

  async handleDisconnect(client: any) {}

  @SubscribeMessage('create-room')
  async createRoom(
    @MessageBody() data: { recipientId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const user = <User>client.data;
    const { recipientId } = data;
    const createRoomResponseDto = await this.roomUserService.createRoom(user.id, recipientId);

    const { roomName } = createRoomResponseDto.roomUser;


    await client.join(roomName);

    client.emit('create-room-response', {
      message: '채팅방이 생성 되었습니다.',
      data: {
        roomName,
      },
    });

    client.emit('notification-response', {
      message: '알림이 도착 했습니다.',
      data: {
        notification: createRoomResponseDto.notification
      }
    })

    console.log('client room', client.rooms);
    return;
  }

  @SubscribeMessage('join')
  async join(
    @MessageBody() data: { roomName: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomName } = data;
    const user = <User>client.data;

    console.log('roomName', roomName);
    console.log('roomName', typeof roomName);

    const roomUser = await this.roomUserService.joinRoom(user.id, roomName);

    await client.join(roomUser.roomName);

    client.emit('join-response', {
      message: '채팅방에 입장 되었습니다.',
      data: {
        roomName,
      },
    });
    console.log('client room', client.rooms);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() data: { roomName: string; message: string, recipientId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const user = <User>client.data;
    const { roomName, message, recipientId} = data;

    const sendMessageDto = new SendMessageDto();
    sendMessageDto.senderId = user.id;
    sendMessageDto.recipientId = recipientId;
    sendMessageDto.roomName = roomName;
    sendMessageDto.message = message;

    const chat = await this.chatService.sendMessage(sendMessageDto);

    client.to(roomName).emit('send-message-response', {
      message: '메세지를 보냈습니다.',
      data: {
        message
      }
    })
  }

  @SubscribeMessage('get-room-list')
  async getRoomList(@ConnectedSocket() client: Socket) {}

  /**
   * @name getChatList
   * - 채팅방 목록을 조회 합니다.
   * - room_user Table에서 사용자의 id를 조회하는데,
   *  해당 roomId에는 2명이상 존재 해야 합니다.
   * - 사용자가 채팅방에서 마지막으로 읽은 채팅보다 뒤에 받은 채팅이 있다면
   *  새로운 채팅 상태를 나타낼 수 있는 응답을 포함 합니다.
   */
  @SubscribeMessage('get-chat-list')
  async getChatList(
    @MessageBody() message: string,
    @ConnectedSocket() client: Socket,
  ) {}
}
