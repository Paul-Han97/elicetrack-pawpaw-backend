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

import { CreateBoardimageDto } from './dto/create-boardimage.dto';
import { UpdateBoardimageDto } from './dto/update-boardimage.dto';
import { IBoardImageService } from './interface/board-image.service.interface';
import { BoardImageService } from './board-image.service';

@Controller('board-images')
export class BoardImageController {
  constructor(
    @Inject(BoardImageService)
    private readonly boardImageService: IBoardImageService,
  ) {}
}
