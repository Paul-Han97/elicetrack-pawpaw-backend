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

import { CreateBoardcategoryDto } from './dto/create-boardcategory.dto';
import { UpdateBoardcategoryDto } from './dto/update-boardcategory.dto';
import { BoardCategoryService } from './board-category.service';
import { IBoardCategoryService } from './interface/board-category.service.interface';

@Controller('board-categories')
export class BoardCategoryController {
  constructor(
    @Inject(BoardCategoryService)
    private readonly boardCategoryService: IBoardCategoryService,
  ) {}
}
