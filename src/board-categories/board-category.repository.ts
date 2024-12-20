import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { BoardCategory } from './entities/board-category.entity';
import { Repository } from 'typeorm';
import { IBoardCategoryRepository } from './interface/board-category.repository.interface';

@CustomRepository(BoardCategory)
export class BoardCategoryRepository
  extends Repository<BoardCategory>
  implements IBoardCategoryRepository {}
