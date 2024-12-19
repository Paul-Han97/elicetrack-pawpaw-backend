import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';
import { Place } from './entities/place.entity';
import { IPlaceRepository } from './interface/place.repository.interface';

@CustomRepository(Place)
export class PlaceRepository
  extends Repository<Place>
  implements IPlaceRepository {}
