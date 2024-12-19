import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Image } from './entities/image.entity';
import { IImageRepository } from './interface/image.repository.interface';

@CustomRepository(Image)
export class ImageRepository
  extends Repository<Image>
  implements IImageRepository {}
