import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Notification extends CommonEntity {
  @Column()
  isRead: boolean;
}
