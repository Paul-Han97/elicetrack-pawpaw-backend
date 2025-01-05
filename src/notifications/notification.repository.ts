import { Injectable, Logger } from '@nestjs/common';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { INotificationRepository } from './interfaces/notification.repository.interface';
import { NOTIFICATION_TYPE_INDEX } from 'src/common/constants';

@CustomRepository(Notification)
@Injectable()
export class NotificationRepository
  extends Repository<Notification>
  implements INotificationRepository
{
  private readonly logger = new Logger(NotificationRepository.name);

  async findNotification(userId: number): Promise<Notification[]> {
    const result = await this.createQueryBuilder('notification')
      .leftJoinAndSelect('notification.user', 'user')
      .leftJoinAndSelect('notification.notificationType', 'notificationType')
      .where('user.id = :userId', { userId })
      .andWhere('notification.isRead = false')
      .getMany();

    return result;
  }
}
