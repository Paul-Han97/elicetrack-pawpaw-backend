import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Inject,
} from '@nestjs/common';
import { CommentService } from './comment.service';
import { CreateCommentDto } from './dto/create-comment.dto';
import { UpdateCommentDto } from './dto/update-comment.dto';
import { ICommentService } from './interface/comment.service.interface';

@Controller('comment')
export class CommentController {
  constructor(
    @Inject(CommentService)
    private readonly commentService: ICommentService,
  ) {}
}
