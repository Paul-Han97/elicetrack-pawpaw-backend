import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Notification } from 'src/notifications/entities/notification.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class NotificationType extends CommonEntity {
  @Column({ length: 15 })
  type: string;

  @OneToMany(() => Notification, (notification) => notification.notificationType)
  notification: Notification[];
}
