import { Inject, Injectable } from '@nestjs/common';
import { BoardRepository } from './board.repository';
import { IBoardRepository } from './interface/board.repository.interface';

@Injectable()
export class BoardService {
  constructor(
    @Inject(BoardRepository)
    private readonly boardRepository: IBoardRepository,
  ) {}
}
