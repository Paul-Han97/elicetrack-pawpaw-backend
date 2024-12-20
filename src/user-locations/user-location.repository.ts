import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { UserLocation } from './entities/user-location.entity';
import { IUserLocationRepository } from './interface/user-location.repository.interface';

@CustomRepository(UserLocation)
export class UserLocationRepository
  extends Repository<UserLocation>
  implements IUserLocationRepository {}
