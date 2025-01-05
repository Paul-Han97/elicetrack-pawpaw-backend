import { Inject, Injectable, Logger, NotFoundException } from '@nestjs/common';
import { ChatRepository } from 'src/chats/chat.repository';
import { IChatRepository } from 'src/chats/interfaces/chat.repository.interface';
import { ERROR_MESSAGE, SUCCESS_MESSAGE } from 'src/common/constants';
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
    const { userId } = getNotificationDto;

    const notificationList =
      await this.notificationRepository.findNotification(userId);

    if (notificationList.length === 0) {
      throw new NotFoundException(ERROR_MESSAGE.NOT_FOUND);
    }

    const getNotificationResponseDto = new GetNotificationResponseDto();
    for (const notification of notificationList) {
      const chat = await this.chatRepository.findById(notification.chatId);
      const sender = await this.userRepository.findUser(chat.senderId);

      getNotificationResponseDto.notificationList.push({
        id: notification.id,
        isRead: notification.isRead,
        message: chat.message,
        roomName: chat.roomName,
        sender: {
          id: sender.id,
          nickname: sender.nickname,
        },
        type: notification.notificationType.type,
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
      user: { id: userId },
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
}
