import { CommonEntity } from 'src/common/typeorm/common.entity';
import { NotificationType } from 'src/notification-types/entities/notification-type.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class Notification extends CommonEntity {
  @Column()
  isRead: boolean;

  @Column({
    nullable: true,
  })
  chatId: number;

  @Column()
  roomName: string;

  @ManyToOne(() => User, (user) => user.notificationSender)
  @JoinColumn({ referencedColumnName: 'id' })
  sender: User;

  @ManyToOne(() => User, (user) => user.notificationRecipient)
  @JoinColumn({ referencedColumnName: 'id' })
  recipient: User;

  @ManyToOne(() => NotificationType)
  @JoinColumn({ referencedColumnName: 'id' })
  notificationType: NotificationType;
}
