import { Inject, Injectable, NotFoundException } from '@nestjs/common';
import { getDataSourceToken } from '@nestjs/typeorm';
import { ChatRepository } from 'src/chats/chat.repository';
import { IChatRepository } from 'src/chats/interfaces/chat.repository.interface';
import {
  ERROR_MESSAGE,
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
import { DataSource, EntityManager } from 'typeorm';
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

    @Inject(getDataSourceToken())
    private readonly dataSource: DataSource,

    private readonly utilService: UtilService,
  ) {}

  async getRoomList(
    getRoomListDto: GetRoomListDto,
  ): Promise<ResponseData<GetRoomListResponseDto>> {
    const { userId } = getRoomListDto;

    const roomUserList = await this.roomUserRepository.findRoomList(userId);

    for (const roomUser of roomUserList) {
      const chat = await this.chatRepository.findByRoomName(roomUser.roomName);
    }

    const getRoomListResponseDto = new GetRoomListResponseDto();

    getRoomListResponseDto.roomList;

    const resData: ResponseData<GetRoomListResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getRoomListResponseDto,
    };
    return resData;
  }

  async createRoom(senderId: number, recipientId: number): Promise<RoomUser> {
    const roomUser = await this.dataSource.transaction<RoomUser>(
      async (manager: EntityManager): Promise<RoomUser> => {
        const roomName = this.utilService.uuidGenerator.generate();
        const roomUserRepository = manager.withRepository(
          this.roomUserRepository,
        );
        const notificationRepository = manager.withRepository(
          this.notificationRepository,
        );

        const recipient = new User();
        recipient.id = recipientId;

        const notificationType = new NotificationType();
        notificationType.id = NOTIFICATION_TYPE_INDEX.INVITE;

        const notification = new Notification();
        notification.notificationType = notificationType;
        notification.recipient = recipient;
        notification.roomName = roomName;
        notification.isRead = false;
        notification.chatId = null;
        notification.createdUser = senderId.toString();

        const roomUser = await roomUserRepository.createRoomUser(
          senderId,
          roomName,
        );

        await notificationRepository.save(notification, { reload: false });

        return roomUser;
      },
    );

    return roomUser;
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
