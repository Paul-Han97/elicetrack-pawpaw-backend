import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ChatRepository } from 'src/chats/chat.repository';
import { IChatRepository } from 'src/chats/interfaces/chat.repository.interface';
import {
  ERROR_MESSAGE,
  NOTIFICATION_TYPE,
  NOTIFICATION_TYPE_INDEX,
  SUCCESS_MESSAGE,
} from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import { CounterRepository } from 'src/counters/counter.repository';
import { ICounterRepository } from 'src/counters/interfaces/counter.repository.interface';
import { IUserRepository } from 'src/users/interfaces/user.repository.interface';
import { UserRepository } from 'src/users/user.repository';
import {
  GetNotificationDto,
  GetNotificationResponseDto,
} from './dto/get-notification.dto';
import { UpdateReadStatusDto } from './dto/update-read-status.dto';
import { INotificationRepository } from './interfaces/notification.repository.interface';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationRepository } from './notification.repository';
import { WsCreateNotificationDto, WsCreateNotificationResponseDto } from './dto/ws-create-notification.dto';
import { User } from 'src/users/entities/user.entity';
import { NotificationType } from 'src/notification-types/entities/notification-type.entity';
import { Notification } from './entities/notification.entity';
import { Chat } from 'src/chats/schemas/chat.schema';

@Injectable()
export class NotificationService implements INotificationService {
  private readonly logger = new Logger(NotificationService.name);

  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: INotificationRepository,

    @Inject(ChatRepository)
    private readonly chatRepository: IChatRepository,

    @Inject(CounterRepository)
    private readonly counterRepository: ICounterRepository,

    @Inject(UserRepository)
    private readonly userRepository: IUserRepository,
  ) {}

  async getNotification(
    getNotificationDto: GetNotificationDto,
  ): Promise<ResponseData<GetNotificationResponseDto>> {
    const { recipientId } = getNotificationDto;

    const notificationList =
      await this.notificationRepository.findNotification(recipientId);

    if (notificationList.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const getNotificationResponseDto = new GetNotificationResponseDto();

    for (const notification of notificationList) {
      if (notification.notificationType.type === NOTIFICATION_TYPE.INVITE) {
        getNotificationResponseDto.notificationList.push({
          id: notification.id,
          isRead: notification.isRead,
          roomName: notification.roomName,
          type: notification.notificationType.type,
          message: null,
          sender: {
            id: notification.sender.id,
            nickname: notification.sender.nickname,
          },
          recipient: {
            id: notification.recipient.id,
            nickname: notification.recipient.nickname,
          },
        });

        continue;
      }

      const chat = await this.chatRepository.findById(notification.chatId);

      getNotificationResponseDto.notificationList.push({
        id: notification.id,
        isRead: notification.isRead,
        type: notification.notificationType.type,
        roomName: notification.roomName,
        message: chat?.message ?? null,
        sender: {
          id: notification.sender.id,
          nickname: notification.sender.nickname,
        },
        recipient: {
          id: notification.recipient.id,
          nickname: notification.recipient.nickname,
        },
      });
    }

    const resData: ResponseData<GetNotificationResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getNotificationResponseDto,
    };

    return resData;
  }

  async updateReadStatus(
    updateReadStatusDto: UpdateReadStatusDto,
  ): Promise<ResponseData> {
    const { id, userId } = updateReadStatusDto;

    const notification = await this.notificationRepository.findOneBy({
      id,
      recipient: { id: userId },
    });

    if (!notification) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    notification.isRead = true;
    notification.updatedUser = userId.toString();

    await this.notificationRepository.save(notification, { reload: false });

    const resData: ResponseData = {
      message: SUCCESS_MESSAGE.REQUEST,
      data: null,
    };

    return resData;
  }

  async wsCreateNotification(wsCreateNotificationDto: WsCreateNotificationDto): Promise<WsCreateNotificationResponseDto>{
    const { senderId, recipientId, roomName, chat } = wsCreateNotificationDto;

    const recipient = await this.userRepository.findOneBy({
      id: recipientId,
    });

    const sender = await this.userRepository.findOneBy({
      id: senderId,
    });

    const notificationType = new NotificationType();
    notificationType.id = chat ? NOTIFICATION_TYPE_INDEX.RECEIVE_MESSAGE : NOTIFICATION_TYPE_INDEX.INVITE;

    const notification = new Notification();
    notification.isRead = false;
    notification.notificationType = notificationType;
    notification.sender = sender;
    notification.recipient = recipient;
    notification.roomName = roomName;
    notification.chatId = chat?.id ?? null;
    notification.createdUser = senderId.toString();

    const createdNotification = await this.notificationRepository.save(notification);

    const wsCreateNotificationResponseDto = new WsCreateNotificationResponseDto();
    wsCreateNotificationResponseDto.id = createdNotification.id;
    wsCreateNotificationResponseDto.type = createdNotification.notificationType.type;
    wsCreateNotificationResponseDto.isRead = createdNotification.isRead;
    wsCreateNotificationResponseDto.recipient.id = recipient.id;
    wsCreateNotificationResponseDto.recipient.nickname = recipient.nickname;
    wsCreateNotificationResponseDto.sender.id = sender.id;
    wsCreateNotificationResponseDto.sender.nickname = sender.nickname;
    wsCreateNotificationResponseDto.roomName = roomName;
    wsCreateNotificationResponseDto.message = chat?.message ?? null;

    return wsCreateNotificationResponseDto;
  }
}
