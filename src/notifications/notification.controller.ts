import { Controller, Inject } from '@nestjs/common';
import { INotificationService } from './interfaces/notification.service.interface';
import { NotificationService } from './notification.service';

@Controller('notifications')
export class NotificationController {
  constructor(
    @Inject(NotificationService)
    private readonly notificationService: INotificationService,
  ) {}
}
