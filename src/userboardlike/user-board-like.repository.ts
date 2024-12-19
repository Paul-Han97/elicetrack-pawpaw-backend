import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { UserBoardLike } from './entities/user-board-like.entity';
import { Repository } from 'typeorm';
import { IUserBoardLikeRepository } from './interface/user-board-like.repository.interface';

@CustomRepository(UserBoardLike)
export class UserBoardLikeRepository
  extends Repository<UserBoardLike>
  implements IUserBoardLikeRepository {}
