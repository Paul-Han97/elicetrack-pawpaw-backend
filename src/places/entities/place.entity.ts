import { CommonEntity } from 'src/common/typeorm/common.entity';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { ReviewPlaceLike } from 'src/review-place-likes/entities/review-place-like.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Place extends CommonEntity {
  @Column({
    nullable: true,
  })
  name: string;

  @Column({
    nullable: true,
  })
  category: string;

  @Column({
    nullable: true,
  })
  postalCode: string;

  @Column({
    nullable: true,
  })
  roadNameAddress: string;

  @Column({
    nullable: true,
  })
  postalAddress: string;

  @Column({
    nullable: true,
  })
  contact: string;

  @Column({
    nullable: true,
  })
  closingDays: string;

  @Column({
    nullable: true,
  })
  openingHour: string;

  @Column({
    nullable: true,
  })
  hasParkingArea: boolean;

  @Column({
    nullable: true,
  })
  price: string;

  @Column({
    nullable: true,
  })
  allowSize: string;

  @Column({
    nullable: true,
  })
  restrictions: string;

  @Column({
    nullable: true,
  })
  description: string;

  @Column({
    nullable: true,
  })
  additionalFees: string;

  @Column({ type: 'datetime' })
  lastUpdate: Date;

  @OneToMany(() => Review, (review) => review.place)
  review: Review[];

  @OneToMany(() => ReviewPlaceLike, (reviewPlaceLike) => reviewPlaceLike.place)
  reviewPlaceLike: ReviewPlaceLike[];

  @OneToMany(() => PlaceLocation, (placeLocation) => placeLocation.place)
  placeLocation: PlaceLocation[];
}
