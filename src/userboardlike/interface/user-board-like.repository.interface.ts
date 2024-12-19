import { Repository } from 'typeorm';
import { UserBoardLike } from '../entities/user-board-like.entity';

export interface IUserBoardLikeRepository extends Repository<UserBoardLike> {}
