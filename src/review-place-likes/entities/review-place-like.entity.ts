import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Column, Entity } from 'typeorm';

@Entity()
export class ReviewPlaceLike extends CommonEntity {
  @Column()
  isLike: boolean;
}
