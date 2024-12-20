import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { PlaceLocation } from './entities/place-location.entity';
import { IPlaceLocationRepository } from './interface/place-location.repository.interface';

@CustomRepository(PlaceLocation)
export class PlaceLocationRepository
  extends Repository<PlaceLocation>
  implements IPlaceLocationRepository {}
