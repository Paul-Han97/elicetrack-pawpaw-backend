import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { UserLocation } from './entities/userlocation.entity';
import { IUserLocationRepository } from './interface/userlocation.repository.interface';

@CustomRepository(UserLocation)
export class UserLocationRepository
  extends Repository<UserLocation>
  implements IUserLocationRepository {}
