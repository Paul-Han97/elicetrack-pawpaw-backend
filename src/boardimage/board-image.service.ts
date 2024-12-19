import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardimageDto } from './dto/create-boardimage.dto';
import { UpdateBoardimageDto } from './dto/update-boardimage.dto';
import { BoardImageRepository } from './board-image.repository';
import { IBoardImageRepository } from './interface/board-image.repository.interface';
import { IBoardImageService } from './interface/board-image.service.interface';

@Injectable()
export class BoardImageService implements IBoardImageService {
  constructor(
    @Inject(BoardImageRepository)
    private readonly boardImageRepository: IBoardImageRepository,
  ) {}
}
