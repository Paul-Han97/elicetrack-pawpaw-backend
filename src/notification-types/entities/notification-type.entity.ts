import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class NotificationType extends CommonEntity {
  @Column()
  type: string;
}
