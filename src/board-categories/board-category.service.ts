import { Inject, Injectable } from '@nestjs/common';
import { CreateBoardcategoryDto } from './dto/create-boardcategory.dto';
import { UpdateBoardcategoryDto } from './dto/update-boardcategory.dto';
import { BoardCategoryRepository } from './board-category.repository';
import { IBoardCategoryRepository } from './interface/board-category.repository.interface';
import { IBoardCategoryService } from './interface/board-category.service.interface';

@Injectable()
export class BoardCategoryService implements IBoardCategoryService {
  constructor(
    @Inject(BoardCategoryRepository)
    private readonly boardCategoryRepository: IBoardCategoryRepository,
  ) {}
}
