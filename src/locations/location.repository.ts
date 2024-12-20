import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { ILocationRepository } from './interface/location.repository.interface';
import { Location } from './entities/location.entity';

@CustomRepository(Location)
export class LocationRepository
  extends Repository<Location>
  implements ILocationRepository {}
