import { Repository } from 'typeorm';
import { NotificationType } from '../entities/notification-type.entity';

export interface INotificationTypeRepository
  extends Repository<NotificationType> {}
