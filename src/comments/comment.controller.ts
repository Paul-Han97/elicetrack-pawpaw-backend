import { Controller, Inject } from '@nestjs/common';
import { CommentService } from './comment.service';
import { ICommentService } from './interface/comment.service.interface';

@Controller('comments')
export class CommentController {
  constructor(
    @Inject(CommentService)
    private readonly commentService: ICommentService,
  ) {}
}
