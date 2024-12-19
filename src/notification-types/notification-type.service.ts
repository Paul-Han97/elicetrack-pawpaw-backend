import { Inject, Injectable } from '@nestjs/common';
import { INotificationTypeRepository } from './interfaces/notification-type.repository.interface';
import { INotificationTypeService } from './interfaces/notification-type.service.interface';
import { NotificationTypeRepository } from './notification-type.repository';

@Injectable()
export class NotificationTypeService implements INotificationTypeService {
  constructor(
    @Inject(NotificationTypeRepository)
    private readonly notificationTypeRepository: INotificationTypeRepository,
  ) {}
}
