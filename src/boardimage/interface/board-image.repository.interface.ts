import { Repository } from 'typeorm';
import { BoardImage } from '../entities/board-image.entity';

export interface IBoardImageRepository extends Repository<BoardImage> {}
