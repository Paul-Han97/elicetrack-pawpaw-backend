import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';
import { UserImage } from './entities/user-image.entity';
import { IUserImageRepository } from './interface/user-image.repository.interface';

@CustomRepository(UserImage)
export class UserImageRepository
  extends Repository<UserImage>
  implements IUserImageRepository {}
