import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Place } from 'src/places/entities/place.entity';
import { ReviewPlaceLike } from 'src/review-place-likes/entities/review-place-like.entity';
import { User } from 'src/users/entities/user.entity';
import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';

@Entity()
export class Review extends CommonEntity {
  @Column()
  title: string;

  @Column()
  content: string;

  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Place)
  @JoinColumn({ referencedColumnName: 'id' })
  place: Place;

  @OneToMany(() => ReviewPlaceLike, (reviewPlaceLike) => reviewPlaceLike.review)
  reviewPlaceLike: ReviewPlaceLike;
}
