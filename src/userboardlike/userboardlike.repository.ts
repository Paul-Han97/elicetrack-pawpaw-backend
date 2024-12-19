import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { UserBoardLike } from './entities/userboardlike.entity';
import { Repository } from 'typeorm';
import { IUserBoardLikeRepository } from './interface/userboardlike.repository.interface';

@CustomRepository(UserBoardLike)
export class UserBoardLikeRepository
  extends Repository<UserBoardLike>
  implements IUserBoardLikeRepository {}
