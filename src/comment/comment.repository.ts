import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Comment } from './entities/comment.entity';
import { Repository } from 'typeorm';
import { ICommentRepository } from './interface/comment.repository.interface';

@CustomRepository(Comment)
export class CommentRepository
  extends Repository<Comment>
  implements ICommentRepository {}
