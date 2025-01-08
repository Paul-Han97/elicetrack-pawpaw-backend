import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ChatRepository } from 'src/chats/chat.repository';
import { IChatRepository } from 'src/chats/interfaces/chat.repository.interface';
import {
  ERROR_MESSAGE,
  NOTIFICATION_TYPE,
  NOTIFICATION_TYPE_INDEX,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { UtilService } from 'src/common/utils/util.service';
import { NotificationType } from 'src/notification-types/entities/notification-type.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { INotificationRepository } from 'src/notifications/interfaces/notification.repository.interface';
import { NotificationRepository } from 'src/notifications/notification.repository';
import { User } from 'src/users/entities/user.entity';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import { DataSource, EntityManager } from 'typeorm';
import { CreateRoomResponseDto } from './dto/create-room.dto';
import {
  GetRoomListDto,
  GetRoomListResponseDto,
} from './dto/get-room-list.dto';
import { RoomUser } from './entities/room-user.entity';
import { IRoomUserRepository } from './interfaces/room-user.repository.interface';
import { IRoomUserService } from './interfaces/room-user.service.interface';
import { RoomUserRepository } from './room-user.repository';

@Injectable()
export class RoomUserService implements IRoomUserService {
  constructor(
    @Inject(RoomUserRepository)
    private readonly roomUserRepository: IRoomUserRepository,

    @Inject(NotificationRepository)
    private readonly notificationRepository: INotificationRepository,

    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

    private readonly utilService: UtilService,
  ) {}

  async getRoomList(
    getRoomListDto: GetRoomListDto,
  ): Promise<ResponseData<GetRoomListResponseDto>> {
    const { userId } = getRoomListDto;

    const roomUserList = await this.roomUserRepository.findRoomList(userId);
    const getRoomListResponseDto = new GetRoomListResponseDto();

    for (const roomUser of roomUserList) {
      const chat = await this.chatRepository.findByRoomName(roomUser.roomName);
      const sender = await this.userRepository.findUser(roomUser?.sender?.id ?? null);
      
      getRoomListResponseDto.roomList.push({
        name: roomUser?.roomName ?? null,
        hasNewMessage: chat?.isRead ?? false,
        lastMessage: chat?.message ?? null,
        sender: {
          id: sender?.id ?? null,
          nickname: sender?.nickname ?? null,
          imageUrl: sender?.userImage?.[0]?.image?.url ?? null,
        },
      });
    }

    const resData: ResponseData<GetRoomListResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getRoomListResponseDto,
    };
    return resData;
  }

  async getRoomNameList(userId: number): Promise<string[]> {
    const roomUserList = await this.roomUserRepository.findRoomList(userId);

    const roomNameList =
      roomUserList?.map((roomUser) => roomUser.roomName) ?? null;

    return roomNameList;
  }

  async createRoom(
    senderId: number,
    recipientId: number,
  ): Promise<CreateRoomResponseDto> {
    const createRoomResponseDto =
      await this.dataSource.transaction<CreateRoomResponseDto>(
        async (manager: EntityManager): Promise<CreateRoomResponseDto> => {
          const roomName = this.utilService.uuidGenerator.generate();
          const roomUserRepository = manager.withRepository(
            this.roomUserRepository,
          );
          const notificationRepository = manager.withRepository(
            this.notificationRepository,
          );
          const userRepository = manager.withRepository(this.userRepository);

          const recipient = await userRepository.findOneBy({
            id: recipientId,
          });

          const sender = await userRepository.findOneBy({
            id: senderId,
          });

          const notificationType = new NotificationType();
          notificationType.id = NOTIFICATION_TYPE_INDEX.INVITE;

          const notification = new Notification();
          notification.notificationType = notificationType;
          notification.recipient = recipient;
          notification.sender = sender;
          notification.roomName = roomName;
          notification.isRead = false;
          notification.chatId = null;
          notification.createdUser = senderId.toString();

          const roomUser = await roomUserRepository.createRoomUser(
            senderId,
            roomName,
          );

          const createdNotification =
            await notificationRepository.save(notification);

          const createRoomResponseDto = new CreateRoomResponseDto();
          createRoomResponseDto.roomUser = roomUser;
          createRoomResponseDto.notification.id = createdNotification.id;
          createRoomResponseDto.notification.isRead =
            createdNotification.isRead;
          createRoomResponseDto.notification.recipient.id = recipient.id;
          createRoomResponseDto.notification.recipient.nickname =
            recipient.nickname;
          createRoomResponseDto.notification.sender.id = sender.id;
          createRoomResponseDto.notification.sender.nickname = sender.nickname;
          createRoomResponseDto.notification.type = NOTIFICATION_TYPE.INVITE;
          createRoomResponseDto.notification.message = null;
          createRoomResponseDto.notification.roomName = roomName;

          return createRoomResponseDto;
        },
      );

    return createRoomResponseDto;
  }

  async joinRoom(recipientId: number, roomName: string): Promise<RoomUser> {
    const roomUser = await this.roomUserRepository.findOneBy({ roomName });

    if (!roomUser) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const recipient = new User();
    recipient.id = recipientId;

    roomUser.recipient = recipient;

    const createdRoomUser = await this.roomUserRepository.save(roomUser);
    return createdRoomUser;
  }
}
