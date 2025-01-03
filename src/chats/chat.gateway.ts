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
import { Server, Socket } from 'socket.io';
import { WsAuthGuard } from 'src/common/guards/ws-auth.guard';
import { ChatService } from './chat.service';
import { IChatService } from './interfaces/chat.service.interface';

type Room = {
  roomId: string,
  userList: [{
    id: string,
  }]
}

@WebSocketGateway({
  namespace: 'chats',
  cors: {
    origin: true,
    credentials: true
  }
})
@UseGuards(WsAuthGuard)
export class ChatGateway
  implements OnGatewayInit, OnGatewayConnection, OnGatewayDisconnect
{
  constructor(
    @Inject(ChatService)
    private readonly chatService: IChatService,
  ) {}

  private readonly roomList:Array<Room> = [];

  @WebSocketServer()
  private readonly server: Server;

  async afterInit(server: Server) {}

  async handleConnection(client: Socket) {
    client.emit('receive-message', {
      body: {
        message: `client id: ${client.id} 연결`,
      },
    });
  }

  async handleDisconnect(client: any) {
    client.emit('receive-message', {
      body: {
        message: `client id: ${client.id} 끊김`,
      },
    });
  }

  @SubscribeMessage('create-room')
  async createRoom(
    @MessageBody() roomId: string,
    @ConnectedSocket() client: Socket,
  ) {
    console.log('client id:', client.id);
    await client.join(roomId);
    client.emit('receive-message', {
      body: {
        message: `${client.id} 님이 ${roomId} 를 생성 하였습니다.`,
      },
    });
    this.roomList.push({
      roomId: roomId,
      userList: [{
        id: client.id,
      }]
    })
    console.log('created client.rooms', client.rooms);
  }

  @SubscribeMessage('join')
  async join(@MessageBody() roomId: string, @ConnectedSocket() client: Socket) {
    console.log('client id:', client.id);
    await client.join(roomId);
    for(const room of this.roomList) {
      if(room.roomId === roomId) {
        room.userList.push({id: client.id});
        console.log(room);
      }
    }
    console.log(this.roomList)
    client.emit('receive-message', {
      body: {
        message: `${client.id} 님이 ${roomId} 로 연결 되었습니다.`,
      },
    });
    console.log('client.rooms', client.rooms);
  }

  @SubscribeMessage('send-message')
  async sendMessage(
    @MessageBody() body: { roomId: string; message: string },
    @ConnectedSocket() client: Socket,
  ) {
    console.log('client id:', client.id);
    console.log('client.rooms', client.rooms);
    console.log(`body.roomId: ${body.roomId}`);
    console.log(`body.message: ${body.message}`);
    client.broadcast.to(body.roomId).emit('receive-message', {
      body: {
        message: body.message,
      },
    });
  }

  @SubscribeMessage('get-room-list')
  async getRoomList(@ConnectedSocket() client: Socket){
    client.emit('receive-message', this.roomList);
  }

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
