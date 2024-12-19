import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';
import { UserImage } from './entities/userimage.entity';
import { IUserImageRepository } from './interface/userimage.repository.interface';

@CustomRepository(UserImage)
export class UserImageRepository
  extends Repository<UserImage>
  implements IUserImageRepository {}
