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
import { BoardService } from './board.service';
import { IBoardService } from './interface/board.service.interface';

@Controller('boards')
export class BoardController {
  constructor(
    @Inject(BoardService)
    private readonly boardsService: IBoardService,
  ) {}
}
