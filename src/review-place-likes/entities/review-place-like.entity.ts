import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Place } from 'src/places/entities/place.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReviewPlaceLike extends CommonEntity {
  @Column()
  isLikeCliked: boolean;

  @ManyToOne(() => Place)
  @JoinColumn({ referencedColumnName: 'id' })
  place: Place;
}
