import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Location } from 'src/locations/entities/location.entity';
import { Place } from 'src/places/entities/place.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class PlaceLocation extends CommonEntity {
  @ManyToOne(() => Location)
  @JoinColumn({ referencedColumnName: 'id' })
  location: Location;

  @ManyToOne(() => Place)
  @JoinColumn({ referencedColumnName: 'id' })
  place: Place;
}
