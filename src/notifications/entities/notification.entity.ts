import { CommonEntity } from 'src/common/typeorm/common.entity';
import { NotificationType } from 'src/notification-types/entities/notification-type.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends CommonEntity {
  @Column()
  isRead: boolean;

  @Column()
  chatId: number;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ referencedColumnName: 'id' })
  notificationType: NotificationType;
}
