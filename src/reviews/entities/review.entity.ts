import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class Review extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;
}
