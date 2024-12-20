import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';
import { Repository } from 'typeorm';
import { Board } from './entities/board.entity';
import { IBoardRepository } from './interface/board.repository.interface';

@CustomRepository(Board)
export class BoardRepository
  extends Repository<Board>
  implements IBoardRepository {}
