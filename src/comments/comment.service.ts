import { Inject, Injectable } from '@nestjs/common';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
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
