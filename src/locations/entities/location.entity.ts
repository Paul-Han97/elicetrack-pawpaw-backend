import { CommonEntity } from 'src/common/typeorm/common.entity';
import { PlaceLocation } from 'src/place-locations/entities/place-location.entity';
import { UserLocation } from 'src/user-locations/entities/user-location.entity';
import { Column, Entity, Index, OneToMany } from 'typeorm';

@Entity()
export class Location extends CommonEntity {
  @Column('point')
  @Index({ spatial: true })
  point: string;

  @OneToMany(() => UserLocation, (userLocation) => userLocation.location)
  userLocation: UserLocation[];

  @OneToMany(() => PlaceLocation, (placeLocation) => placeLocation.location)
  placeLocation: PlaceLocation[];
}
