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
import { SOCKET_KEYS, SUCCESS_MESSAGE } from 'src/common/constants';
import { WsAuthGuard } from 'src/common/guards/ws-auth.guard';
import { INotificationService } from 'src/notifications/interfaces/notification.service.interface';
import { NotificationService } from 'src/notifications/notification.service';
import { IRoomUserService } from 'src/room-user/interfaces/room-user.service.interface';
import { RoomUserService } from 'src/room-user/room-user.service';
import { User } from 'src/users/entities/user.entity';
import { IUserService } from 'src/users/interfaces/user.service.interface';
import { UserService } from 'src/users/user.service';
import { ChatService } from './chat.service';
import { GetMessageByRoomNameDto } from './dto/get-message-by-room-name.dto';
import { SendMessageDto } from './dto/send-message.dto';
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

    @Inject(RoomUserService)
    private readonly roomUserService: IRoomUserService,

    @Inject(NotificationService)
    private readonly notificationService: INotificationService,

    @Inject(UserService)
    private readonly userService: IUserService,
  ) {}

  @WebSocketServer()
  private readonly server: Server;

  async afterInit(server: Server) {}

  async handleConnection(client: Socket) {}

  async handleDisconnect(client: Socket) {}

  @SubscribeMessage(SOCKET_KEYS.CREATE_ROOM)
  async createRoom(
    @MessageBody() data: { recipientId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const user = <User>client.data;
    const { recipientId } = data;
    const { roomUser, hasRoomUser } = await this.roomUserService.createRoom(
      user.id,
      recipientId,
    );

    if (hasRoomUser) {
      client.emit(SOCKET_KEYS.CREATE_ROOM_RESPONSE, {
        message: SUCCESS_MESSAGE.ROOM_ALREADY_EXIST,
        data: {
          roomId: roomUser.id,
          roomName: roomUser.roomName,
        },
      });
      return;
    }

    const notification = await this.notificationService.wsCreateNotification({
      recipientId,
      senderId: user.id,
      chat: null,
      roomName: roomUser.roomName,
    });

    await client.join(roomUser.roomName);

    client.emit(SOCKET_KEYS.CREATE_ROOM_RESPONSE, {
      message: SUCCESS_MESSAGE.CREATED_CHAT_ROOM,
      data: {
        roomId: roomUser.id,
        roomName: roomUser.roomName,
      },
    });

    const recipient = await this.userService.getUserById(recipientId);
    client.to(recipient.clientId).emit(SOCKET_KEYS.NOTIFICATION_RESPONSE, {
      message: SUCCESS_MESSAGE.NOTIFICATION_ARRIVED,
      data: {
        notification,
      },
    });
  }

  @SubscribeMessage(SOCKET_KEYS.JOIN)
  async join(
    @MessageBody() data: { roomName: string },
    @ConnectedSocket() client: Socket,
  ) {
    const { roomName } = data;
    const user = <User>client.data;

    const roomUser = await this.roomUserService.joinRoom(user.id, roomName);

    await client.join(roomUser.roomName);

    client.emit(SOCKET_KEYS.JOIN_RESPONSE, {
      message: SUCCESS_MESSAGE.JOINED_ROOM,
      data: {
        roomName,
      },
    });
  }

  @SubscribeMessage(SOCKET_KEYS.SEND_MESSAGE)
  async sendMessage(
    @MessageBody()
    data: { roomName: string; message: string; recipientId: number },
    @ConnectedSocket() client: Socket,
  ) {
    const user = <User>client.data;
    const { roomName, message, recipientId } = data;

    const sendMessageDto = new SendMessageDto();
    sendMessageDto.senderId = user.id;
    sendMessageDto.recipientId = recipientId;
    sendMessageDto.roomName = roomName;
    sendMessageDto.message = message;

    const chat = await this.chatService.sendMessage(sendMessageDto);

    const notification = await this.notificationService.wsCreateNotification({
      senderId: user.id,
      recipientId,
      chat: chat,
      roomName,
    });

    client.to(roomName).emit(SOCKET_KEYS.SEND_MESSAGE_RESPONSE, {
      message: SUCCESS_MESSAGE.SENT_MESSAGE,
      data: {
        message,
      },
    });

    client.broadcast.to(roomName).emit(SOCKET_KEYS.NOTIFICATION_RESPONSE, {
      message: SUCCESS_MESSAGE.NOTIFICATION_ARRIVED,
      data: {
        notification,
      },
    });
  }

  @SubscribeMessage(SOCKET_KEYS.JOIN_ROOM_LIST)
  async joinRoomList(@ConnectedSocket() client: Socket) {
    const user = <User>client.data;

    await this.userService.updateClientId(user.id, client.id);

    const roomNameList = await this.roomUserService.getRoomNameList(user.id);

    for (const roomName of roomNameList) {
      await client.join(roomName);
    }

    client.emit(SOCKET_KEYS.JOIN_ROOM_LIST_RESPONSE, {
      message: SUCCESS_MESSAGE.JOINED_ROOM,
      data: {
        roomNameList,
      },
    });
  }

  @SubscribeMessage(SOCKET_KEYS.GET_MESSAGE_LIST)
  async getMessageByRoomName(
    @MessageBody() data: { roomName: string },
    @ConnectedSocket() client: Socket,
  ) {
    const getMessageByRoomNameDto = new GetMessageByRoomNameDto();
    getMessageByRoomNameDto.roomName = data.roomName;

    const messageList = await this.chatService.getMessageByRoomName(
      getMessageByRoomNameDto,
    );

    client.emit(SOCKET_KEYS.GET_MESSAGE_LIST_RESPONSE, {
      message: SUCCESS_MESSAGE.FIND,
      data: {
        messageList,
      },
    });
  }
}
