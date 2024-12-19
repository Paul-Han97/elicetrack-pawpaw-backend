import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { PetImage } from './entities/petimage.entity';
import { Repository } from 'typeorm';
import { IPetImageRepository } from './interface/petimage.repository';

@CustomRepository(PetImage)
export class PetImageRepository
  extends Repository<PetImage>
  implements IPetImageRepository {}
