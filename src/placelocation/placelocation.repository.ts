import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { PlaceLocation } from './entities/placelocation.entity';
import { IPlaceLocationRepository } from './interface/placelocation.repository.interface';

@CustomRepository(PlaceLocation)
export class PlaceLocationRepository
  extends Repository<PlaceLocation>
  implements IPlaceLocationRepository {}
