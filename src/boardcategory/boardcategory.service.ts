import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardcategoryDto } from './dto/create-boardcategory.dto';
import { UpdateBoardcategoryDto } from './dto/update-boardcategory.dto';
import { BoardCategoryRepository } from './boardcategory.repository';
import { IBoardCategoryRepository } from './interface/boardcategory.repository.interface';

@Injectable()
export class BoardCategoryService {
  constructor(
    @Inject(BoardCategoryRepository)
    private readonly boardCategoryRepository: IBoardCategoryRepository,
  ) {}
}
