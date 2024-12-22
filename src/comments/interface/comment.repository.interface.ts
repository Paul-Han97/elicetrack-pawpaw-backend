import { Repository } from 'typeorm';
import { Comment } from '../entities/comment.entity';

export interface ICommentRepository extends Repository<Comment> {}
