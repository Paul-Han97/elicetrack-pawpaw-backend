import { CommonEntity } from 'src/common/typeorm/common.entity';
import { Location } from 'src/locations/entities/location.entity';
import { User } from 'src/users/entities/user.entity';
import { Entity, JoinColumn, ManyToOne } from 'typeorm';

@Entity()
export class UserLocation extends CommonEntity {
  @ManyToOne(() => User)
  @JoinColumn({ referencedColumnName: 'id' })
  user: User;

  @ManyToOne(() => Location)
  @JoinColumn({ referencedColumnName: 'id' })
  location: Location;
}
