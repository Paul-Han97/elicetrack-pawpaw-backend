import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardimageDto } from './dto/create-boardimage.dto';
import { UpdateBoardimageDto } from './dto/update-boardimage.dto';
import { BoardImageRepository } from './boardimage.repository';
import { IBoardImageRepository } from './interface/boardimage.repository.interface';

@Injectable()
export class BoardImageService {
  constructor(
    @Inject(BoardImageRepository)
    private readonly boardImageRepository: IBoardImageRepository,
  ) {}
}
