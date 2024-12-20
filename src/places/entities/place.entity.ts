import { CommonEntity } from 'src/common/typeorm/common.entity';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { ReviewPlaceLike } from 'src/review-place-likes/entities/review-place-like.entity';
import { Review } from 'src/reviews/entities/review.entity';
import { Column, Entity, OneToMany } from 'typeorm';

@Entity()
export class Place extends CommonEntity {
  @Column()
  name: string;

  @Column()
  category: string;

  @Column()
  postalCode: string;

  @Column()
  roadNameAddress: string;

  @Column()
  postalAddress: string;

  @Column()
  contact: string;

  @Column()
  closingDays: string;

  @Column()
  openingHour: string;

  @Column()
  hasParkingArea: boolean;

  @Column()
  price: string;

  @Column()
  allowSize: string;

  @Column()
  restrictions: string;

  @Column()
  description: string;

  @Column()
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
