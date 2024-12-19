import { CustomRepository } from 'src/common/typeorm/typeorm-custom.decorator';

import { Repository } from 'typeorm';

import { BoardImage } from './entities/boardimage.entity';
import { IBoardImageRepository } from './interface/boardimage.repository.interface';

@CustomRepository(BoardImage)
export class BoardImageRepository
  extends Repository<BoardImage>
  implements IBoardImageRepository {}
