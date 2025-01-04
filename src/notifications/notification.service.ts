import { Inject, Injectable } from '@nestjs/common';
import { SUCCESS_MESSAGE } from 'src/common/constants';
import { ResponseData } from 'src/common/types/response.type';
import {
  GetNotificationDto,
  GetNotificationResponseDto,
} from './dto/get-notification.dto';
import { INotificationRepository } from './interfaces/notification.repository.interface';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: INotificationRepository,
  ) {}

  async getNotification(
    getNotificationDto: GetNotificationDto,
  ): Promise<ResponseData<GetNotificationResponseDto>> {
    const { userId } = getNotificationDto;

    const getNotificationResponseDto = new GetNotificationResponseDto();

    const resData: ResponseData<GetNotificationResponseDto> = {
      message: SUCCESS_MESSAGE.FIND,
      data: getNotificationResponseDto,
    };

    return resData;
  }
}
