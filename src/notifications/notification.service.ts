import { Inject, Injectable } from '@nestjs/common';
import { INotificationRepository } from './interfaces/notification.repository.interface';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationRepository } from './notification.repository';

@Injectable()
export class NotificationService implements INotificationService {
  constructor(
    @Inject(NotificationRepository)
    private readonly notificationRepository: INotificationRepository,
  ) {}
}
