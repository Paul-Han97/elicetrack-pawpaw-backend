import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { BoardImage } from './entities/board-image.entity';
import { IBoardImageRepository } from './interface/board-image.repository.interface';

@CustomRepository(BoardImage)
export class BoardImageRepository
  extends Repository<BoardImage>
  implements IBoardImageRepository {}
