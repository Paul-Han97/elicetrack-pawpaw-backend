import { Controller, Inject } from '@nestjs/common';
import { INotificationTypeService } from './interfaces/notification-type.service.interface';
import { NotificationTypeService } from './notification-type.service';

@Controller('notification-types')
export class NotificationTypeController {
  constructor(
    @Inject(NotificationTypeService)
    private readonly notificationTypeService: INotificationTypeService,
  ) {}
}
