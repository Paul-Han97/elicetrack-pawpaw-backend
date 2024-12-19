import { Repository } from 'typeorm';
import { UserBoardLike } from '../entities/userboardlike.entity';

export interface IUserBoardLikeRepository extends Repository<UserBoardLike> {}
