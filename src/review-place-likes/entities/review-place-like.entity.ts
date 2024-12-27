import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Place } from 'src/places/entities/place.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class ReviewPlaceLike extends CommonEntity {
  @Column()
  isLikeClicked: boolean;

  @ManyToOne(() => Place)
  @JoinColumn({ referencedColumnName: 'id' })
  place: Place;

  @ManyToOne(() => Review)
  @JoinColumn({ referencedColumnName: 'id' })
  review: Review;
}
