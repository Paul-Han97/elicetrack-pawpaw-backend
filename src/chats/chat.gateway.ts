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
import { ChatService } from './chat.service';
import { IChatService } from './interfaces/chat.service.interface';

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
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  async afterInit(server: Server) {}

  async handleConnection(client: Socket) {}

  async handleDisconnect(client: any) {}

  @SubscribeMessage('create-room')
  async createRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {}

  @SubscribeMessage('join')
  async join(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {}

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() body: { roomId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {}

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
