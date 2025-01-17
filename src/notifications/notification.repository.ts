import { Injectable, Logger } from '@nestjs/common';
import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Notification } from './entities/notification.entity';
import { INotificationRepository } from './interfaces/notification.repository.interface';

@CustomRepository(Notification)
@Injectable()
export class NotificationRepository
  extends Repository<Notification>
  implements INotificationRepository
{
  private readonly logger = new Logger(NotificationRepository.name);

  async findNotification(recipientId: number): Promise<Notification[]> {
    const result = await this.createQueryBuilder('notification')
      .leftJoinAndSelect('notification.recipient', 'recipient')
      .leftJoinAndSelect('notification.sender', 'sender')
      .leftJoinAndSelect('notification.notificationType', 'notificationType')
      .where('recipient.id = :recipientId', { recipientId })
      .andWhere('notification.isRead = false')
      .getMany();

    return result;
  }
}
