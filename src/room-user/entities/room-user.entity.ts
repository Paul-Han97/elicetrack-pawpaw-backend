import { CommonEntity } from 'src/common/typeorm/common.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class RoomUser extends CommonEntity {
  @Column({
    nullable: false,
  })
  roomName: string;

  @ManyToOne(() => User, (user) => user.roomUserRecipient)
  @JoinColumn({ referencedColumnName: 'id' })
  recipient: User;

  @ManyToOne(() => User, (user) => user.roomUserSender)
  @JoinColumn({ referencedColumnName: 'id' })
  sender: User;
}
