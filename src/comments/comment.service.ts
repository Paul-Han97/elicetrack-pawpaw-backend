import { Inject, Injectable } from '@nestjs/common';
import { CommentRepository } from './comment.repository';
import { ICommentRepository } from './interface/comment.repository.interface';
import { ICommentService } from './interface/comment.service.interface';

@Injectable()
export class CommentService implements ICommentService {
  constructor(
    @Inject(CommentRepository)
    private readonly commentRepository: ICommentRepository,
  ) {}
}
