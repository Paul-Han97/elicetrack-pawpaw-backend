import { Repository } from 'typeorm';
import { Notification } from '../entities/notification.entity';

export interface INotificationRepository extends Repository<Notification> {}
