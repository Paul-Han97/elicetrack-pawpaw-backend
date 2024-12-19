import { Repository } from 'typeorm';
import { BoardImage } from '../entities/boardimage.entity';

export interface IBoardImageRepository extends Repository<BoardImage> {}
