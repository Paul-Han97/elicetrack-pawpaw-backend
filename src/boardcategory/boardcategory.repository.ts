import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { BoardCategory } from './entities/boardcategory.entity';
import { Repository } from 'typeorm';
import { IBoardCategoryRepository } from './interface/boardcategory.repository.interface';

@CustomRepository(BoardCategory)
export class BoardCategoryRepository
  extends Repository<BoardCategory>
  implements IBoardCategoryRepository {}
